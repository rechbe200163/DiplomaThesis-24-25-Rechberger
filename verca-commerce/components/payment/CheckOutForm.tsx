'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { formatPrice } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { FormState } from '@/lib/form.types';
import { reduceStockofPurchasedProducts } from '@/lib/actions/product.actions';
import { ExtendedProduct } from '@/lib/interfaces';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

type CheckoutFromProps = {
  products: ExtendedProduct[];
  cartId: string;
  clientSecret: string;
  paymentAmount: number;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! as string
);

export const CheckOutForm = ({
  products,
  clientSecret,
  cartId,
  paymentAmount,
}: CheckoutFromProps) => {
  return (
    <div className='max-w-5xl w-full mx-auto space-y-8 p-10'>
      <Elements
        options={{
          clientSecret,
        }}
        stripe={stripePromise}
      >
        <Form amount={paymentAmount} products={products} cartId={cartId} />
      </Elements>
    </div>
  );
};

export default CheckOutForm;

function Form({
  amount,
  products,
  cartId,
}: {
  amount: number;
  products: ExtendedProduct[];
  cartId: string;
}) {
  const t = useTranslations('Purchase');
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | FormState>();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe oder Elemente sind nicht verfügbar.');
      setErrorMessage('Stripe oder Elemente sind nicht verfügbar.');
      return;
    }

    setIsLoading(true);

    try {
      // Bestätigt die Zahlung
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      // Wenn keine Fehler auftreten, reduziere den Bestand
      if (!error) {
        const resp = await reduceStockofPurchasedProducts(products, cartId);
        router.push(`/checkout-success/${cartId}`);
      } else {
        setErrorMessage(error.message || 'Unbekannter Fehler');
      }
    } catch (error) {
      console.error('Fehler im Zahlungsvorgang:', error);
      setErrorMessage('Es ist ein unerwarteter Fehler aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{t('purchase')}</CardTitle>
          {errorMessage && (
            <CardDescription className='text-destructive'>
              {errorMessage.toString()}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
        </CardContent>
        <CardFooter>
          <Button
            className='w-full'
            size='lg'
            disabled={
              stripe == null || elements == null || amount === 0 || isLoading
            }
          >
            {isLoading
              ? `${t('button')}...`
              : `${t('button')} - ${formatPrice(amount)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
