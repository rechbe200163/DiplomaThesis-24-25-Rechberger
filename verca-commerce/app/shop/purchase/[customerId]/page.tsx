import { getCartByUserId } from '@/lib/data';
import React from 'react';

import CheckOutForm from '@/components/payment/CheckOutForm';
import { Product } from '@prisma/client';
import { stripe } from '@/lib/stripeClient';

export default async function PurchasePage({
  params: { customerId },
}: {
  params: { customerId: string };
}) {
  console.log(customerId);
  const cart = await getCartByUserId(customerId);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cart.products.reduce(
      (acc, product) => acc + product.product.price,
      0
    ),
    currency: 'usd',
  });

  if (paymentIntent.client_secret == null) {
    throw new Error('Could not create payment intent');
  }

  return (
    <CheckOutForm
      products={cart.products as unknown as Product[]}
      clientSecret={paymentIntent.client_secret}
    />
  );
}
