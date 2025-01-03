import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { formatPrice, formatStatsChange } from '@/lib/utils';
import { getAvarageOrderValueStats } from '@/lib/data.dashboard';

export default async function AvarageOderValueCard() {
  const { currentMonthAIV, lastMonthAIV, percentageChange } =
    await getAvarageOrderValueStats();
  const descriptionText = formatStatsChange(percentageChange);
  return (
    <DashboardCard
      title='Avarage Order Value'
      value={formatPrice(currentMonthAIV)}
      description={descriptionText}
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
          <rect width='20' height='14' x='2' y='5' rx='2' />
          <path d='M2 10h20' />
        </svg>
      }
    />
  );
}
