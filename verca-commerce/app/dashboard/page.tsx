import React from 'react';
import { auth } from '@/auth';

import PaginationComponent from '@/components/pagination/PaginationComponent';
import { console } from 'inspector';
import OrderCart from '@/components/cards/dashboard/OrderCart';
import {
  getOrdersByCustomerPagination,
  getTotalOrders,
} from '@/lib/data/data.orders';

async function UserOrdersPage(props: {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
}) {
  const session = await auth();
  if (!session) return null;
  const customerReference = session?.user?.customerReference;

  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams?.limit ? parseInt(searchParams.limit) : 5;

  const { orders, totalPages } = await getOrdersByCustomerPagination(
    customerReference!,
    page,
    limit
  );

  return (
    <div className='space-y-4'>
      <h2 className='text-3xl font-bold tracking-tight'>Your Orders</h2>
      <div className='flex flex-col gap-4'>
        {orders.length > 0 ? (
          orders.map((order) => <OrderCart key={order.orderId} order={order} />)
        ) : (
          <div className='col-span-full text-center'>No orders yet</div>
        )}
      </div>
      <PaginationComponent totalPages={totalPages} />
    </div>
  );
}
export default UserOrdersPage;
