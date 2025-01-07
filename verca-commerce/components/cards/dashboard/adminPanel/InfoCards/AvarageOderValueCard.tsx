import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { formatPrice, formatStatsChange } from '@/lib/utils';

import { ChartBarDecreasing } from 'lucide-react';
import { getAvarageOrderValueStats } from '@/lib/data/data.invoices';

export default async function AvarageOderValueCard() {
  const { currentMonthAIV, lastMonthAIV, percentageChange } =
    await getAvarageOrderValueStats();
  const descriptionText = formatStatsChange(percentageChange);
  return (
    <DashboardCard
      title='Avarage Order Value'
      value={formatPrice(currentMonthAIV)}
      change={{
        value: percentageChange,
        timeframe: descriptionText,
      }}
      icon={<ChartBarDecreasing className='h-4 w-4 text-muted-foreground' />}
    />
  );
}
