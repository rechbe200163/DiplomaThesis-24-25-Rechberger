import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { getRevenueStats } from '@/lib/data.dashboard';
import { formatPrice, formatStatsChange } from '@/lib/utils';
import { EuroIcon } from 'lucide-react';

export default async function RevenueInfoCard() {
  const { currentMonthRevenue, lastMonthRevenue, percentageChange } =
    await getRevenueStats();

  const descriptionText = formatStatsChange(percentageChange);

  return (
    <DashboardCard
      title='Revenue'
      value={formatPrice(currentMonthRevenue)}
      change={{
        value: percentageChange,
        timeframe: descriptionText,
      }}
      icon={<EuroIcon className='h-4 w-4 text-muted-foreground' />}
    />
  );
}
