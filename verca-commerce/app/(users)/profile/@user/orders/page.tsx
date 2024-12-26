import { auth } from '@/auth';
import React, { Suspense } from 'react';
import {
  getOrdersByCustomerPagination,
  getTotalOrders,
} from '@/lib/data.dashboard';
import OrderList from '@/components/cards/dashboard/OrdersComponent';

import PaginationComponent from '@/components/pagination/PaginationComponent';
import { console } from 'inspector';
import { Skeleton } from '@/components/ui/skeleton';

async function UserOrdersPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const session = await auth();
  if (!session) return null;
  const customerReference = session?.user?.customerReference;
  console.log(customerReference);

  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  const orders = await getOrdersByCustomerPagination(customerReference!, page);
  const { totalOrders } = await getTotalOrders(customerReference);
  const ORDERS_PER_PAGE = 5;
  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);

  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold tracking-tight'>Your Orders</h2>
      <OrderList orders={orders} />
      <PaginationComponent totalPages={totalPages} />
    </div>
  );
}
export default UserOrdersPage;
