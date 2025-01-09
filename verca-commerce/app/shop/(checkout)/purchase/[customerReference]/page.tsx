import React, { Suspense } from 'react';
import { Product } from '@prisma/client';
import { stripe } from '@/lib/stripeClient';
import CheckOutForm from '@/components/payment/CheckOutForm';
import { ExtendedProduct } from '@/lib/interfaces';
import { getCartByCustomerReference } from '@/lib/data/data.cart';
import ImageComponent from '@/components/images/ImageComponent';
import ImageSkeleton from '@/components/images/ImageSkeleton';
import { formatPrice } from '@/lib/utils';

export default async function PurchasePage(props: {
  params: Promise<{ customerReference: number }>;
}) {
  const params = await props.params;

  const { customerReference } = params;

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
    <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-extrabold text-gray-900 mb-8'>
          Your Purchase
        </h1>
        <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <div className='grid gap-6 mb-8'>
              {products.map((product) => (
                <div
                  key={product.productId}
                  className='flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0 last:pb-0'
                >
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0 w-24 h-24 relative'>
                      <Suspense fallback={<ImageSkeleton />}>
                        <ImageComponent
                          imagePath={product.imagePath!}
                          alt={product.name}
                          width={96}
                          height={96}
                          classname='w-full h-full object-cover rounded-md'
                        />
                      </Suspense>
                    </div>
                    <div>
                      <h2 className='text-lg font-medium text-gray-900'>
                        {product.name}
                      </h2>
                      <p className='mt-1 text-sm text-gray-500'>
                        {formatPrice(product.price)} x {product.quantity}
                      </p>
                    </div>
                  </div>
                  <p className='text-lg font-medium text-gray-900'>
                    {formatPrice(product.price * product.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className='mt-8'>
              <CheckOutForm
                products={products as ExtendedProduct[]}
                cartId={cartId}
                clientSecret={paymentIntent.client_secret}
                paymentAmount={paymentIntent.amount}
              />
              ;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
