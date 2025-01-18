'use client';

import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@prisma/client';

interface CategoryFilterProps {
  categories: Category[];
}

const CategoryFilterComponent: React.FC<CategoryFilterProps> = ({
  categories,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams);
    const selectedFilter = searchParams.get('filter');

    if (selectedFilter === value) {
      params.delete('filter');
    } else if (value) {
      params.set('filter', value);
    } else {
      params.delete('filter');
    }

    if (!params.toString()) {
      // No other search params, return to /shop
      replace('/shop');
    } else if (params.has('filter')) {
      // Keep other search params, update filter
      const newPath = pathname.includes('/search')
        ? pathname
        : `${pathname}/search`;
      replace(`${newPath}?${params.toString()}`);
    } else {
      // Remove filter, keep other search params
      replace(`${pathname}?${params.toString()}`);
    }
  }

  // Get the currently selected filter from the URL
  const selectedFilter = searchParams.get('filter');

  return (
    <div>
      <ScrollArea className='w-full whitespace-nowrap rounded-md border'>
        <div className='flex w-max space-x-4 p-4'>
          {categories.map((category) => (
            <Badge
              key={category.categoryId}
              variant={
                selectedFilter === category.categoryId ? 'default' : 'outline'
              }
              className='cursor-pointer'
              onClick={() => handleSearch(category.categoryId)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>

      {/* Render selected category below */}
      {selectedFilter && (
        <div className='mt-4'>
          <h3 className='text-sm font-semibold'>Selected Category:</h3>
          <Badge variant='default'>
            {categories.find(
              (category) => category.categoryId === selectedFilter
            )?.name || 'Unknown'}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterComponent;
