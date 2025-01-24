import { auth } from '@/auth';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function DashboardHeader() {
  const t = await getTranslations('Dashboard');
  const session = await auth();
  if (!session?.user) return;
  return (
    <header className='bg-white shadow-md w-full'>
      <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center space-x-4'>
          <SidebarTrigger className='text-gray-600 hover:text-gray-900 transition-colors duration-200' />
          <div className='flex flex-col'>
            <span className='text-xl font-medium text-gray-600 leading-tight'>
              {t('greeting')},
            </span>
            <h1 className='text-3xl font-bold text-gray-900 leading-tight mt-1'>
              {session?.user?.firstName}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
