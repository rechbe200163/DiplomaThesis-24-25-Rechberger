import { auth } from '@/auth';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import { getTotalUsers, getUsersPagination } from '@/lib/data.dashboard';
import React from 'react';

async function AdminPanelUsersPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const session = await auth();
  if (!session) return null;

  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  const users = await getUsersPagination(page);
  const { totalCustomers } = await getTotalUsers();
  const USERS_PER_PAGE = 5;
  const totalPages = Math.ceil(totalCustomers / USERS_PER_PAGE);
  console.log('totalPages', totalPages);

  return (
    <div className='space-y-4'>
      <h2 className='text-3xl font-bold tracking-tight'>Your Orders</h2>
      <div className='flex flex-col gap-4'>
        {users.length > 0 ? (
          users.map((order) => (
            <div>
              <div>{order.email}</div>
              <div>{order.firstName}</div>
              <div>{order.lastName}</div>
              <div>{order.phoneNumber}</div>
            </div>
          ))
        ) : (
          <div className='col-span-full text-center'>No orders yet</div>
        )}
      </div>
      <PaginationComponent totalPages={totalPages} />
    </div>
  );
}

export default AdminPanelUsersPage;
