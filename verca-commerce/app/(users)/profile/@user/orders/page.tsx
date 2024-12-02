import { auth } from '@/auth';
import React from 'react';
import {
  getOrdersByCustomerPagination,
  getTotalOrders,
} from '@/lib/data.dashboard';
import Orders from '@/components/cards/dashboard/OrdersComponent';

import PaginationComponent from '@/components/pagination/PaginationComponent';

async function UserOrdersPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const session = await auth();
  if (!session) return null;
  const customerReference = session?.user?.customerReference;

  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  const orders = await getOrdersByCustomerPagination(customerReference!, page);
  const { totalOrders } = await getTotalOrders(customerReference);
  const ORDERS_PER_PAGE = 5;
  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);

  return (
    <div className=''>
      <h1 className='sticky top-10'>Orders</h1>
      <Orders orders={orders} />
      <PaginationComponent totalPages={totalPages} />
    </div>
  );
}

export default UserOrdersPage;
