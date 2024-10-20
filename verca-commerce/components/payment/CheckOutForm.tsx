'use client';

import React, { useState } from 'react';

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

type CheckoutFromProps = {
  products: Product[];
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! as string
);

const CheckOutForm = ({ products, clientSecret }: CheckoutFromProps) => {
  const total = products.reduce(
    (acc, product) => acc + product.product.price,
    0
  );

  return (
    <div className='max-w-5xl w-full mx-auto space-y-8 p-10'>
      {products.map((product) => (
        <div
          key={product.product.id}
          className='flex items-center justify-between'
        >
          <div className='flex items-center space-x-4'>
            <div className='aspect-video flex-shrink-0 w-1/3 relative'>
              <Image
                src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
                alt={product.product.name}
                width={100}
                height={100}
              />
            </div>
            <div>
              <h2 className='text-lg font-semibold'>{product.product.name}</h2>
              <p>{formatPrice(product.product.price)}</p>
            </div>
          </div>
        </div>
      ))}
      <Elements
        options={{
          clientSecret,
        }}
        stripe={stripePromise}
      >
        <Form amount={total} />
      </Elements>
    </div>
  );
};
export default CheckOutForm;

function Form({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (stripe == null || elements == null) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/stripe/checkout-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An error occurred');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className='text-destructive'>
              {errorMessage}
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
