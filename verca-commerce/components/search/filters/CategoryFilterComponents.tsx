'use client';

import React, { useState } from 'react';
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

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Manage a single selected category

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

    // Update the selected category
    setSelectedCategory(
      (prevSelected) => (prevSelected === value ? null : value) // Toggle the selection
    );
  }

  // Get the selected category name
  const selectedCategoryName = categories.find(
    (category) => category.categoryId === selectedCategory
  )?.name;

  return (
    <div>
      <ScrollArea className='w-full whitespace-nowrap rounded-md border'>
        <div className='flex w-max space-x-4 p-4'>
          {categories.map((category) => (
            <Badge
              key={category.categoryId}
              variant={
                selectedCategory === category.categoryId ? 'default' : 'outline'
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
      {/* {selectedCategoryName && (
        <div className='mt-4'>
          <h3 className='text-sm font-semibold'>Selected Category:</h3>
          <Badge variant='default'>{selectedCategoryName}</Badge>
        </div>
      )} */}
    </div>
  );
};

export default CategoryFilterComponent;
