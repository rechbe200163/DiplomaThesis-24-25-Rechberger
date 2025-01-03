import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { getCustomerStats } from '@/lib/data.dashboard';
import { formatStatsChange } from '@/lib/utils';
import { Users } from 'lucide-react';

export default async function CustomerInfoCard() {
  const { currentMonthSignUps, percentageChange } = await getCustomerStats();
  const descriptionText = formatStatsChange(percentageChange);
  return (
    <DashboardCard
      title='New Customers'
      value={currentMonthSignUps}
      change={{
        value: percentageChange,
        timeframe: descriptionText,
      }}
      icon={<Users className='h-4 w-4 text-muted-foreground' />}
    />
  );
}
