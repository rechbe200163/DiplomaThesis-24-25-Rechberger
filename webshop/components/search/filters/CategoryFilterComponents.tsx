'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@prisma/client';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Breadcrumbs from '@/components/nav/BreadCrumps';

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
      replace('/'); // Behalte nur den Root-Pfad
    } else if (params.has('filter')) {
      const newPath = pathname.includes('/search') ? pathname : '/search';
      replace(`${newPath}?${params.toString()}`); // Füge '/search' explizit hinzu
    } else {
      replace(`${pathname}?${params.toString()}`); // Nutze den relativen Pfad
    }
  }
  const selectedFilter = searchParams.get('filter');

  return (
    <div className='space-y-4'>
      {/* Breadcrumbs component */}

      <ScrollArea className='w-full rounded-md border border-gray-200 dark:border-gray-700'>
        <div className='flex w-max space-x-2 p-4'>
          {categories.map((category) => (
            <Badge
              key={category.categoryId}
              variant={
                selectedFilter === category.categoryId ? 'default' : 'outline'
              }
              className='cursor-pointer text-sm px-3 py-1 transition-colors duration-200'
              onClick={() => handleSearch(category.categoryId)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
    </div>
  );
};

export default CategoryFilterComponent;
