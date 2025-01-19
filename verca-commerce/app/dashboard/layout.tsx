import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from 'sonner';
import { DashboardSidebar } from '@/components/nav/dashboard/SideNav';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import Link from 'next/link';
import checkUserAuthorization from '@/lib/utils';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await checkUserAuthorization();
  if (!role) {
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
      <div className='flex flex-col h-screen '>
        <div className='flex flex-1 overflow-hidden'>
          <DashboardSidebar />

          <div className='flex-1 flex flex-col overflow-hidden'>
            <DashboardHeader />
            <main className='flex-1 overflow-x-hidden overflow-y-auto'>
              <div className='container mx-auto px-6 py-8'>{children}</div>
            </main>
          </div>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
