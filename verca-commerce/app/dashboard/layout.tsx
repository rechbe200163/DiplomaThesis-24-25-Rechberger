import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from 'sonner';
import { DashboardSidebar } from '@/components/nav/dashboard/SideNav';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { auth } from '@/auth';
import Link from 'next/link';
import { AdminPanelSidebar } from '@/components/nav/adminPanel/SideBar';
import cehckUserRole from '@/lib/utils';
import checkUserAuthorization from '@/lib/utils';
import { Role } from '@prisma/client';

export default async function DashboardLayout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
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

  console.log(role);

  return (
    <SidebarProvider>
      <div className='flex flex-col h-screen '>
        <div className='flex flex-1 overflow-hidden'>
          {
            // Conditional rendering of the sidebar based on role
            role === Role.CUSTOMER ? (
              <DashboardSidebar />
            ) : (
              <AdminPanelSidebar />
            )
          }
          <div className='flex-1 flex flex-col overflow-hidden'>
            <DashboardHeader />
            <main className='flex-1 overflow-x-hidden overflow-y-auto'>
              <div className='container mx-auto px-6 py-8'>
                {role === 'ADMIN' ? admin : user}
              </div>
            </main>
          </div>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
