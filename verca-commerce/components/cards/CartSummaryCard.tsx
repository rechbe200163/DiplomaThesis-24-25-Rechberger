import { formatPrice } from '@/lib/utils';
import React from 'react';
import { ButtonLink } from '../helpers/ButtonLink';
import { getCartByCustomerReference } from '@/lib/data/data.cart';

async function CartSummaryCard({
  customerReference,
}: {
  customerReference: number;
}) {
  const request = await getCartByCustomerReference(customerReference);

  // Calculate subtotal
  const subtotal = request.products.reduce(
    (acc, product) => acc + product.product.price * product.quantity,
    0
  );

  // Determine if any products are sold out
  const isProductSoldOut = request.products.some(
    (product) => product.product.stock === 0
  );

  return (
    <div className='w-full md:w-1/3'>
      <div className='bg-white shadow-xl rounded-2xl p-6 sticky top-20'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Summary</h2>
        {request.products.map((product) => (
          <div
            key={product.product.name}
            className='flex justify-between items-center mb-2'
          >
            <div className='text-lg font-medium text-gray-700'>
              {product.product.name}
            </div>
            <div className='text-lg font-medium text-gray-700'>
              {formatPrice(product.product.price) + ' x ' + product.quantity}
            </div>
          </div>
        ))}
        <div className='border-t border-gray-200 my-4'></div>

        {/* Display subtotal and total */}
        <div className='text-lg font-medium text-gray-700 mb-2'>
          Subtotal: {formatPrice(subtotal)}
        </div>
        <div className='text-xl font-bold text-gray-800 mt-4 border-t pt-4'>
          Total: {formatPrice(subtotal)}
        </div>

        {/* Checkout Button */}
        <div className='pt-4'>
          <ButtonLink
            href={`/shop/purchase/${customerReference}`}
            disabled={subtotal === 0 || isProductSoldOut}
          >
            {subtotal === 0
              ? 'Kein Produkt im Warenkorb'
              : isProductSoldOut
                ? 'Einige Produkte im Warenkorb sind ausverkauft'
                : 'Weiter zur Kasse'}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryCard;
