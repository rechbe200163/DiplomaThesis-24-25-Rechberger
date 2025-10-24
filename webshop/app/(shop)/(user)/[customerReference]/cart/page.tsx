import CartSummaryCard from '@/components/cards/CartSummaryCard';
import ProductsCartCard from '@/components/cards/ProductsCartCard';
import { getCartByCustomerReference } from '@/lib/data/data.cart';
import { getTranslations } from 'next-intl/server';

import React from 'react';

async function CartPage(props: {
  params: Promise<{ customerReference: number }>;
}) {
  const t = await getTranslations('Shop.cart');
  const params = await props.params;
  const cart = await getCartByCustomerReference(params.customerReference);

  return (
    <div className='p-5 md:p-10 space-y-10 bg-gray-50 min-h-screen'>
      <div className='text-center md:text-left'>
        <span className='text-3xl font-extrabold text-gray-800'>
          {t('title')}
        </span>
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-10'>
        <ProductsCartCard cart={cart} />
        <CartSummaryCard customerReference={params.customerReference} />
      </div>
    </div>
  );
}

export default CartPage;
