import CartSummaryCard from '@/components/cards/CartSummaryCard';
import ProductsCartCard from '@/components/cards/ProductsCartCard';
import { getCartByCustomerReference } from '@/lib/data.shop';
import React from 'react';

async function CartPage(props: {
  params: Promise<{ customerReference: number }>;
}) {
  const params = await props.params;
  const cart = await getCartByCustomerReference(params.customerReference);

  return (
    <div className='p-5 md:p-10 space-y-10 bg-gray-50 min-h-screen'>
      <div className='text-center md:text-left'>
        <span className='text-3xl font-extrabold text-gray-800'>
          Shopping Cart
        </span>
        <div className='flex justify-center md:justify-start space-x-2 mt-2'>
          <h1 className='text-lg font-semibold text-gray-600'>
            proceed with the checkout
          </h1>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-10'>
        <ProductsCartCard cart={cart} />
        <CartSummaryCard customerReference={params.customerReference} />
      </div>
    </div>
  );
}

export default CartPage;
