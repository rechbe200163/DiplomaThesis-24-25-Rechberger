import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from 'sonner';
import { DashboardSidebar } from '@/components/nav/dashboard/SideNav';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import Link from 'next/link';
import { auth } from '@/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
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
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
