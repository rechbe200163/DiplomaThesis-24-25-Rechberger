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
import { getTranslations } from 'next-intl/server';

async function CartIconComponent() {
  const t = await getTranslations('Shop.cart');
  const session = await auth();

  // Return nothing if there's no session (user not authenticated)
  if (!session) return null;

  const customerReference = session.user.customerReference;

  const { cart, sum } = await fetchProductsInCart(
    session.user.customerReference
  );

  const totalItems = cart?._count?.products ?? 0;
  const totalPrice = sum;

  return (
    <Link
      href={`/${customerReference}/cart`}
      className='relative inline-flex items-center justify-center p-3 text-gray-800 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-md'
      style={{ minWidth: '48px', minHeight: '48px' }}
    >
      <ShoppingBag className='h-6 w-6 text-foreground' />
      <span className='sr-only'>{t('title')}</span>
      {totalItems > 0 && (
        <span
          className='absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-primary rounded-full'
          style={{ minWidth: '24px', minHeight: '24px' }}
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}

export default CartIconComponent;
