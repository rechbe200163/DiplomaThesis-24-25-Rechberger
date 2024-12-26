import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from 'sonner';
import { DashboardSidebar } from '@/components/nav/dashboard/SideNav';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { auth } from '@/auth';
import Link from 'next/link';

export default async function DashboardLayout({
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
          <DashboardSidebar />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <DashboardHeader />
            <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100'>
              <div className='container mx-auto px-6 py-8'>
                {session?.user.role === user ? admin : user}
              </div>
            </main>
          </div>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
