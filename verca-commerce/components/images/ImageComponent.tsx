import React from 'react';
import Image from 'next/image';
import { cn, getSignedURL } from '@/lib/utils';
import { AspectRatio } from '../ui/aspect-ratio';

interface ImagesComponentProps {
  imagePath: string;
  alt: string;
  width?: number;
  layout?: 'responsive' | 'fill' | 'fixed' | 'intrinsic';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  height?: number;
  classname?: string;
}

async function ImageComponent({
  imagePath,
  alt,
  width,
  layout = 'responsive',
  objectFit = 'cover',
  height,
  classname = '',
}: ImagesComponentProps) {
  const imageURL = await getSignedURL(imagePath);

  if (!imageURL) {
    // Placeholder image with dynamic Tailwind styling
    return (
      <div
        className={cn(
          'bg-gray-300',
          'flex',
          'items-center',
          'justify-center',
          'rounded-md',
          'overflow-hidden',
          classname
        )}
      >
        <p className='text-gray-500 text-sm'>Image not found</p>
      </div>
    );
  }

  return (
    <Image
      src={imageURL}
      alt={alt}
      width={width}
      layout={layout}
      objectFit={objectFit}
      height={height}
      className={classname}
    />
  );
}

export default ImageComponent;
