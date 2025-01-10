'use client';

import React, { Suspense, useState } from 'react';

import { Product } from '@prisma/client';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import Image from 'next/image';
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
import { CartWithProducts } from '@/lib/types';
import { ExtendedProduct } from '@/lib/interfaces';
import ImageComponent from '../images/ImageComponent';
import ImageSkeleton from '../images/ImageSkeleton';

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
  const total = paymentAmount;

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
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | FormState>();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (stripe == null || elements == null) {
      return;
    }

    setIsLoading(true);
    reduceStockofPurchasedProducts(products, cartId).then((response) => {
      if (!response.success) {
        setErrorMessage(response.errors?.title[0]);
        setIsLoading(false);
        return;
      }

      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout-success/${cartId}`,
          },
        })
        .then(({ error }) => {
          if (
            error.type === 'card_error' ||
            error.type === 'validation_error'
          ) {
            setErrorMessage(error.message);
          } else {
            setErrorMessage('An error occurred');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
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
            {isLoading ? 'Purchasing...' : `Purchase - ${formatPrice(amount)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
