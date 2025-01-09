import React from 'react';
import DecreaseProductQuantity from '../forms/cart/decreaseProductQuantity';
import IncreaseProductQuantity from '../forms/cart/increaseProductQuantity';
import { getProductCartInformationById } from '@/lib/data/data.cart';

export const ProductCartQuantity = async ({
  productId,
}: {
  productId: string;
}) => {
  const product = await getProductCartInformationById(productId);
  console.log(product);
  return (
    <div className='flex items-center rounded-lg border bg-background'>
      <DecreaseProductQuantity
        productId={product.productId}
        quantity={product.quantity}
      />
      <div className='px-3 h-8 flex items-center text-center min-w-[2rem]'>
        <span className='text-sm'>{product.quantity}</span>
      </div>
      <IncreaseProductQuantity
        productId={product.productId}
        quantity={product.quantity}
        stock={product.product.stock}
      />
    </div>
  );
};
