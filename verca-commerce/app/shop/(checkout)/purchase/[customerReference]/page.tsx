import { getCartByCustomerReference } from '@/lib/data';
import React from 'react';
import { Product } from '@prisma/client';
import { stripe } from '@/lib/stripeClient';
import CheckOutForm from '@/components/payment/CheckOutForm';

export default async function PurchasePage(props: {
  params: Promise<{ customerReference: number }>;
}) {
  const params = await props.params;

  const { customerReference } = params;

  console.log(customerReference);
  const cart = await getCartByCustomerReference(customerReference);

  const cartId = cart.cartId;

  const products = cart.products.map((product) => ({
    productId: product.product.productId,
    name: product.product.name,
    price: product.product.price,
    imagePath: product.product.imagePath,
    quantity: product.quantity,
  }));

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cart.products.reduce(
      (acc, product) => acc + product.product.price * product.quantity,
      0
    ),
    currency: 'eur',
  });

  if (paymentIntent.client_secret == null) {
    throw new Error('Could not create payment intent');
  }

  return (
    <CheckOutForm
      products={products as ExtendedProduct[]}
      cartId={cartId}
      clientSecret={paymentIntent.client_secret}
      paymentAmount={paymentIntent.amount}
    />
  );
}
