import { auth } from '@/auth';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import InteractiviyComponent from '@/components/nav/dashboard/InteractiviyComponent';
import DashboardFooter from '@/components/nav/dashboard/DashboardFooter';
import { AppSidebar } from '@/components/nav/dashboard/SideNav';
import DashbaordFooterSkeleton from '@/components/skeletons/DashboardFooterSkeleton';
import SideNavSkeleton from '@/components/skeletons/SideNavSkeleton';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Layout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user.role) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Link href={'/auth/signin'} className='btn btn-primary'>
          Login
        </Link>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className='flex flex-col h-screen bg-gray-100'>
        <div className='flex flex-1 overflow-hidden'>
          <AppSidebar />
          <SidebarInset>
            <div className='flex-1 flex flex-col overflow-hidden'>
              <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100'>
                <div className='container mx-auto px-6 py-8'>
                  <DashboardHeader />
                  {session?.user.role === user ? admin : user}
                </div>
              </main>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
