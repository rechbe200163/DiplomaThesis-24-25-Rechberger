import { getCartByUserId } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import React from 'react';
import CheckOutForm from '../payment/CheckOutForm';
import Link from 'next/link';

async function CartSummaryCard({ customerId }: { customerId: string }) {
  const prices = await getCartByUserId(customerId);

  const subtotal = prices.products.reduce(
    (acc, product) => acc + product.product.price,
    0
  );
  const tax = 0;
  const shipping = 0;

  return (
    <div className=' w-full md:w-1/3'>
      <div className='bg-white shadow-xl rounded-2xl p-6 sticky top-20'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Summary</h2>
        {prices.products.map((product) => (
          <div
            key={product.product.name}
            className='flex justify-between items-center mb-2'
          >
            <div className='text-lg font-medium text-gray-700'>
              {product.product.name}
            </div>
            <div className='text-lg font-medium text-gray-700'>
              {formatPrice(product.product.price)}
            </div>
          </div>
        ))}
        <div className='border-t border-gray-200 my-4'></div>

        <div className='text-lg font-medium text-gray-700 mb-2'>
          Subtotal: {formatPrice(subtotal)}
        </div>
        <div className='text-lg font-medium text-gray-700 mb-2'>
          Shipping: {formatPrice(shipping)}
        </div>
        <div className='text-xl font-bold text-gray-800 mt-4 border-t pt-4'>
          Total: {formatPrice(subtotal + tax + shipping)}
        </div>
        <Link href={`/shop/purchase/${customerId}`}>Proceed to Checkout</Link>
      </div>
    </div>
  );
}

export default CartSummaryCard;
