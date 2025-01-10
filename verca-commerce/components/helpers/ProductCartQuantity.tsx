import React from 'react';
import DecreaseProductQuantity from '../forms/cart/decreaseProductQuantity';
import IncreaseProductQuantity from '../forms/cart/increaseProductQuantity';
import { getProductCartInformationById } from '@/lib/data/data.cart';

export const ProductCartQuantity = async ({
  productId,
}: {
  productId: string;
}) => {
  const resp = await getProductCartInformationById(productId);
  console.log(resp);
  return (
    <div className='flex items-center rounded-lg border bg-background'>
      <DecreaseProductQuantity
        productId={resp.productId}
        quantity={resp.quantity}
        stock={resp.product.stock}
      />
      <div className='px-3 h-8 flex items-center text-center min-w-[2rem]'>
        <span className='text-sm'>{resp.quantity}</span>
      </div>
      <IncreaseProductQuantity
        productId={resp.productId}
        quantity={resp.quantity}
        stock={resp.product.stock}
      />
    </div>
  );
};
