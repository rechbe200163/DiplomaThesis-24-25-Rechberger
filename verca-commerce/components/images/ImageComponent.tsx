import React from 'react';
import Image from 'next/image';
import { cn, getSignedURL } from '@/lib/utils';
import { AspectRatio } from '../ui/aspect-ratio';

interface ImagesComponentProps {
  imagePath: string;
  alt: string;
  width?: number;
  fill?: boolean;
  style?: React.CSSProperties;
  sizes?: string;
  height?: number;
  classname?: string;
}

async function ImageComponent({
  imagePath,
  alt,
  width,
  fill,
  style,
  height,
  sizes,
  classname = '',
}: ImagesComponentProps) {
  fill = fill ?? false;
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
      fill={fill}
      style={style}
      height={height}
      sizes={sizes}
      className={classname}
    />
  );
}

export default ImageComponent;
