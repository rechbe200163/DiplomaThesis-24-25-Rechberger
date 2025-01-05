import { auth } from '@/auth';
import { UserTable } from '@/components/cards/dashboard/adminPanel/UserTable';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import { Button } from '@/components/ui/button';
import { getTotalUsers, getUsersPagination } from '@/lib/data.dashboard';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb className='mb-6'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Customers</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-3xl font-bold tracking-tight'>User Management</h2>
        <Button asChild>
          <Link href='/dashboard/customers/add'>
            <PlusCircle className='mr-2 h-4 w-4' /> Add Customer
          </Link>
        </Button>
      </div>
      <div className='bg-white rounded-lg shadow-md p-6'>
        {users.length > 0 ? (
          <UserTable users={users} />
        ) : (
          <div className='text-center py-8 text-gray-500'>No users found</div>
        )}
      </div>
      <div className='mt-6'>
        <PaginationComponent totalPages={totalPages} />
      </div>
    </div>
  );
}

export default AdminPanelUsersPage;
