import { DashboardCard } from '@/components/cards/dashboard/adminPanel/DashboardCard';
import AvarageOderValueCard from '@/components/cards/dashboard/adminPanel/InfoCards/AvarageOderValueCard';
import CustomerInfoCard from '@/components/cards/dashboard/adminPanel/InfoCards/CustomerInfoCard';
import RevenueInfoCard from '@/components/cards/dashboard/adminPanel/InfoCards/RevenueInfoCard';
import SalesInfoCard from '@/components/cards/dashboard/adminPanel/InfoCards/SalesInfoCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className='flex-1 space-y-6 p-8 pt-6'>
      <h1 className='text-3xl font-bold tracking-tight'>Monthly Stats</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <RevenueInfoCard />
        <CustomerInfoCard />
        <SalesInfoCard />
        <AvarageOderValueCard />
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
