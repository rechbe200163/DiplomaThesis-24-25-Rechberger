import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { getRevenueStats } from '@/lib/data.dashboard';
import { formatPrice, formatStatsChange } from '@/lib/utils';

export default async function RevenueInfoCard() {
  const { currentMonthRevenue, lastMonthRevenue, percentageChange } =
    await getRevenueStats();

  const descriptionText = formatStatsChange(percentageChange);

  return (
    <DashboardCard
      title='Revenue'
      value={formatPrice(currentMonthRevenue)}
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