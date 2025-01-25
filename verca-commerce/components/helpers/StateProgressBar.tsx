'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { OrderState } from '@prisma/client';
import { useTranslations } from 'next-intl';

export function StateProgressBar({
  currentState,
  selfCollect,
}: {
  currentState: OrderState;
  selfCollect: boolean;
}) {
  const t = useTranslations('Orders.order');

  // Define the states as usual
  const states = [
    OrderState.ORDER_PLACED,
    OrderState.IN_PROGRESS,
    OrderState.DISPATCHED,
    OrderState.DELIVERED,
    OrderState.ORDER_COLLECTED,
  ];

  // state for not self collect
  let filteredStates: OrderState[] = [];
  filteredStates = selfCollect
    ? [
        OrderState.ORDER_PLACED,
        OrderState.IN_PROGRESS,
        OrderState.ORDER_COLLECTED,
      ]
    : states.filter((state) => state !== OrderState.ORDER_COLLECTED);

  // Determine the current index of the currentState in the filtered states
  const currentIndex = filteredStates.indexOf(currentState);

  return (
    <div className='flex items-center w-full space-x-4'>
      {filteredStates.map((state, index) => (
        <React.Fragment key={state}>
          <div className='flex-1 flex flex-col items-center justify-center'>
            <motion.div
              initial={{ scale: 0.5, opacity: 0.2 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                {
                  'bg-green-500 text-white': index <= currentIndex,
                  'bg-gray-200 text-gray-600': index > currentIndex,
                }
              )}
            >
              {index + 1}
            </motion.div>
            <span className='text-sm w-auto'>{t(state.toLowerCase())}</span>
          </div>
          {index < filteredStates.length - 1 && (
            <motion.div
              initial={{ width: 5 }}
              animate={{ width: index < currentIndex ? '9%' : '0%' }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              className={cn('h-1 rounded-lg', {
                'bg-green-500': index < currentIndex,
                'bg-gray-200': index >= currentIndex,
              })}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
