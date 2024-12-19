import { getCartByCustomerReference } from '@/lib/data.shop';
import Image from 'next/image';
import React, { Suspense } from 'react';
import RemoveFromCart from '../forms/cart/removeFromCart';

import { formatPrice } from '@/lib/utils';
import IncreaseProductQuantity from '../forms/cart/increaseProductQuantity';
import DecreaseProductQuantity from '../forms/cart/decreaseProductQuantity';
import { GenericActionForm } from '../forms/cart/genericForm';
import { removeFromCart, updateQuantity } from '@/lib/actions/product.actions';
import { MinusIcon } from 'lucide-react';
import ImageComponent from '../images/ImageComponent';
import ImageSkeleton from '../images/ImageSkeleton';

async function ProductsCartCard({
  customerReference,
}: {
  customerReference: number;
}) {
  const products = await getCartByCustomerReference(customerReference);
  return (
    <div className='flex flex-col gap-6 p-4 md:p-0  overflow-auto relative '>
      {products.products.map((product) => (
        <div
          key={product.product.name}
          className='card card-side shadow-xl rounded-lg overflow-hidden bg-white max-w-full w-full mx-auto '
        >
          <figure className='card-image relative'>
            <Suspense fallback={<ImageSkeleton />}>
              <ImageComponent
                imagePath={product.product.imagePath!}
                alt={product.product.name}
                width={400}
                height={400}
                classname='w-full h-auto object-cover'
              />
            </Suspense>
          </figure>
          <div className='card-body flex flex-col gap-4 p-4 w-full'>
            <div className='text-lg font-semibold text-gray-800'>
              {product.product.name}
            </div>
            <div className='badge badge-outline text-gray-600'>
              {product.product.stock}
            </div>
            <div className='text-gray-600'>
              {formatPrice(product.product.price)} x {product.quantity}
            </div>
            <div className='flex items-center justify-between mt-auto'>
              <div className='flex items-center justify-between'>
                <DecreaseProductQuantity
                  productId={product.product.productId}
                  quantity={product.quantity}
                />
                {product.quantity}
                <IncreaseProductQuantity
                  productId={product.product.productId}
                  quantity={product.quantity}
                />
              </div>
              <GenericActionForm
                buttonText='remove'
                action={removeFromCart}
                param={product.product.productId}
                size='sm'
                variant='destructive'
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsCartCard;
