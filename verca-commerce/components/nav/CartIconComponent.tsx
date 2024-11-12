import { auth } from '@/auth';
import { fetchProductsInCart } from '@/lib/data';
import Link from 'next/link';
import React from 'react';
import { IoCartOutline } from 'react-icons/io5';

async function CartIconComponent() {
  const session = await auth();

  // Return nothing if there's no session (user not authenticated)
  if (!session) return null;

  // Fetch the number of products in the cart if the user is authenticated
  const productsCount = await fetchProductsInCart(
    session.user.customerReference
  );

  return (
    <div>
      <Link href={`/shop/${session.user.customerReference}/cart`}>
        <div className='flex relative'>
          <IoCartOutline size={35} />
          {productsCount && productsCount._count?.products > 0 && (
            <div className='badge badge-primary badge-md absolute -top-2 -right-4'>
              {productsCount._count.products}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default CartIconComponent;
