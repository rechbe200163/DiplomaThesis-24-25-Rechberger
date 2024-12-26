import { SidebarTrigger } from '@/components/ui/sidebar';

export function DashboardHeader() {
  return (
    <header>
      <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center'>
        <SidebarTrigger className='mr-4' />
        <h1 className='text-3xl font-bold text-gray-900'>MyStore Dashboard</h1>
      </div>
    </header>
  );
}
