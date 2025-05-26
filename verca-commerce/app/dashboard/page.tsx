import React from 'react';
import { auth } from '@/auth';

import PaginationComponent from '@/components/pagination/PaginationComponent';
import OrderCart from '@/components/cards/dashboard/OrderCart';
import { getOrdersByCustomerPagination } from '@/lib/data/data.orders';
import { getTranslations } from 'next-intl/server';

async function UserOrdersPage(props: {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
}) {
  const t = await getTranslations('');
  const session = await auth();
  if (!session) return null;
  const customerReference = session?.user?.customerReference;

  const searchParams = await props.searchParams;
  const page = searchParams?.page ? Number.parseInt(searchParams.page) : 1;
  const limit = searchParams?.limit ? Number.parseInt(searchParams.limit) : 5;

  const { orders, totalPages } = await getOrdersByCustomerPagination(
    customerReference!,
    page,
    limit
  );

  console.log('orders', orders);

  return (
    <div className='h-full max-h-full overflow-y-auto px-4 py-2'>
      {orders.length > 0 ? (
        orders.map((order) => <OrderCart key={order.orderId} order={order} />)
      ) : (
        <>
          <div className='text-center py-8'>{t('title')}</div>
          <div className='text-center py-8'> {t('desc')}</div>
        </>
      )}

      <PaginationComponent totalPages={totalPages} />
    </div>
  );
}

export default UserOrdersPage;
