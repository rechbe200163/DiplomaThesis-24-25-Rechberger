import { auth } from '@/auth';
import HeaderBox from '@/components/header/HeaderBox';
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
      <AppSidebar />
      <SidebarInset>
        <main className='flex flex-row h-full w-full p-2'>
          <SidebarTrigger className='sticky top-2' />
          {session?.user.role === user ? admin : user}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
