import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { formatPrice, formatStatsChange } from '@/lib/utils';
import { getAvarageOrderValueStats } from '@/lib/data.dashboard';
import { ChartBarDecreasing } from 'lucide-react';

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
