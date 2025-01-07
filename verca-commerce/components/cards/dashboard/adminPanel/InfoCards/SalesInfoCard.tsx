import React from 'react';
import { DashboardCard } from '../DashboardCard';

import { formatStatsChange } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { getSalesStats } from '@/lib/data/data.invoices';

export default async function SalesInfoCard() {
  const { currentMonthSales, percentageChange } = await getSalesStats();

  const descriptionText = formatStatsChange(percentageChange);

  return (
    <DashboardCard
      title='Sales'
      value={currentMonthSales}
      change={{
        value: percentageChange,
        timeframe: descriptionText,
      }}
      icon={<ShoppingCart className='h-4 w-4 text-muted-foreground' />}
    />
  );
}
