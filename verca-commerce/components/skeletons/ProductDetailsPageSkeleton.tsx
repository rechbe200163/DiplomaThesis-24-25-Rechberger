import React from 'react';
import { ChevronRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

const ProductDetailsPageSkeleton = () => {
  return (
    <div className='container mx-auto px-4 py-8 animate-pulse'>
      {/* Breadcrumb */}
      <nav className='flex items-center space-x-2 text-sm text-muted-foreground mb-8'>
        <div className='h-4 w-10 bg-gray-300 rounded'></div>
        <ChevronRight className='h-4 w-4 text-gray-300' />
        <div className='h-4 w-20 bg-gray-300 rounded'></div>
        <ChevronRight className='h-4 w-4 text-gray-300' />
        <div className='h-4 w-32 bg-gray-300 rounded'></div>
      </nav>

      <div className='grid gap-8 lg:grid-cols-2'>
        {/* Product Image */}
        <div className='space-y-4'>
          <div className='relative aspect-square overflow-hidden rounded-lg border bg-gray-300'></div>
        </div>

        {/* Product Info */}
        <div className='space-y-6'>
          <div>
            <div className='h-8 bg-gray-300 rounded w-3/4 mb-4'></div>
            <div className='mt-4 flex items-center space-x-4'>
              <div className='h-8 bg-gray-300 rounded w-24'></div>
              <Badge
                variant='secondary'
                className='bg-gray-300 text-transparent'
              >
                Placeholder
              </Badge>
            </div>
          </div>

          <Separator />

          <div className='space-y-2'>
            <div className='h-4 bg-gray-300 rounded w-full'></div>
            <div className='h-4 bg-gray-300 rounded w-11/12'></div>
            <div className='h-4 bg-gray-300 rounded w-10/12'></div>
          </div>

          {/* Add to Cart Section */}
          <div className='space-y-4'>
            <div className='h-10 bg-gray-300 rounded w-full'></div>

            {/* Delivery Info */}
            <Card>
              <CardContent className='grid gap-4 p-6'>
                {[1, 2, 3].map((item) => (
                  <div key={item} className='flex items-center gap-4'>
                    <div className='h-5 w-5 bg-gray-300 rounded-full'></div>
                    <div className='space-y-1 flex-1'>
                      <div className='h-4 bg-gray-300 rounded w-1/4'></div>
                      <div className='h-3 bg-gray-300 rounded w-3/4'></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Product Details Accordion */}
          <Accordion type='single' collapsible className='w-full'>
            {['specifications', 'shipping', 'returns'].map((item) => (
              <AccordionItem key={item} value={item}>
                <AccordionTrigger>
                  <div className='h-4 bg-gray-300 rounded w-32'></div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='space-y-2'>
                    <div className='h-3 bg-gray-300 rounded w-full'></div>
                    <div className='h-3 bg-gray-300 rounded w-11/12'></div>
                    <div className='h-3 bg-gray-300 rounded w-10/12'></div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPageSkeleton;
