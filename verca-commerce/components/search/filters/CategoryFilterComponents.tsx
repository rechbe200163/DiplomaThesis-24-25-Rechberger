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

  const selectedCategories: string[] = []; // Define selectedCategories

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('filter', value);
    } else {
      params.delete('filter');
    }

    // Check if the current pathname already contains '/search'
    const newPath = pathname.includes('/search')
      ? pathname
      : `${pathname}/search`;

    replace(`${newPath}?${params.toString()}`);
  }

  // Get selected category names
  const selectedCategoryNames = categories
    .filter((category) => selectedCategories.includes(category.categoryId))
    .map((category) => category.name);

  return (
    <div>
      <ScrollArea className='w-full whitespace-nowrap rounded-md border'>
        <div className='flex w-max space-x-4 p-4'>
          {categories.map((category) => (
            <Badge
              key={category.categoryId}
              variant={
                selectedCategories.includes(category.categoryId)
                  ? 'default'
                  : 'outline'
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

      {/* Render selected categories below */}
      {selectedCategoryNames.length > 0 && (
        <div className='mt-4'>
          <h3 className='text-sm font-semibold'>Selected Categories:</h3>
          <div className='mt-2 flex flex-wrap gap-2'>
            {selectedCategoryNames.map((name, index) => (
              <Badge key={index} variant='default'>
                {name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterComponent;
