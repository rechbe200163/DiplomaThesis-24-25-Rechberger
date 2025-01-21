import { auth } from '@/auth';
import { fetchProductsInCart } from '@/lib/data/data.cart';
import { formatPrice } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@radix-ui/react-hover-card';
import { ArrowRight, ShoppingBag, ShoppingCart, Sigma } from 'lucide-react';

import Link from 'next/link';
import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { Button } from '../ui/button';

async function CartIconComponent() {
  const session = await auth();

  // Return nothing if there's no session (user not authenticated)
  if (!session) return null;

  const customerReference = session.user.customerReference;

  const { cart, sum } = await fetchProductsInCart(
    session.user.customerReference
  );

  const totalItems = cart._count.products;
  const totalPrice = sum;

  return (
    <Link
      href={`/${customerReference}/cart`}
      className='relative inline-flex items-center justify-center p-2 text-gray-800 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-md'
    >
      <ShoppingBag className='h-6 w-6 text-foreground' />
      {totalItems > 0 && (
        <span className='absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full'>
          {totalItems}
        </span>
      )}
    </Link>
  );
}

export default CartIconComponent;
