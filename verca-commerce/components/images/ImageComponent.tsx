import React from 'react';
import Image from 'next/image';
import { getSignedURL } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

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
      <div className='w-full h-full bg-muted flex items-center justify-center'>
        <ImageOff className='h-8 w-8 text-muted-foreground/50' />
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
