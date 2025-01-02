import { DashboardCard } from '@/components/cards/dashboard/adminPanel/DashboardCard';
import SalesInfoCard from '@/components/cards/dashboard/adminPanel/InfoCards/SalesInfoCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className='flex-1 space-y-6 p-8 pt-6'>
      <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <DashboardCard
          title='Total Revenue'
          value='$45,231.89'
          description='+20.1% from last month'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          }
        />
        <DashboardCard
          title='Subscriptions'
          value='+2350'
          description='+180.1% from last month'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
              <circle cx='9' cy='7' r='4' />
              <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
            </svg>
          }
        />
        <SalesInfoCard />
        <DashboardCard
          title='Active Now'
          value='+573'
          description='+201 since last hour'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
            </svg>
          }
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {/* <DashboardCard
          title='Kunden'
          value={customers.length}
          link='/customers'
        />
        <DashboardCard
          title='Bestellungen'
          value={orders.length}
          link='/orders'
        />
        <DashboardCard
          title='Produkte'
          value={products.length}
          link='/products'
        />
        <DashboardCard title='Routen' value={routes.length} link='/routes' /> */}
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Verkaufsübersicht</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>{/* <SalesChart /> */}</CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Aktuelle Verkäufe</CardTitle>
          </CardHeader>
          <CardContent>{/* <RecentSales /> */}</CardContent>
        </Card>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Umsatzübersicht</CardTitle>
          </CardHeader>
          <CardContent>{/* <Overview /> */}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Verkaufsprognosen</CardTitle>
          </CardHeader>
          <CardContent>{/* <PredictionsChart /> */}</CardContent>
        </Card>
      </div>
    </div>
  );
}
