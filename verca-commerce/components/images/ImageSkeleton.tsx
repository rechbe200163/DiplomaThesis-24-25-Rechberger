import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Package2 } from 'lucide-react';

const ImageSkeleton = () => {
  return (
    <div className='w-full h-full animate-pulse bg-muted flex items-center justify-center'>
      <Package2 className='h-8 w-8 text-muted-foreground/50' />
    </div>
  );
};

export default ImageSkeleton;
