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
    <div
      className='overflow-hidden rounded-md' // Ensures alignment with card borders
      style={{
        position: 'relative',
        width: width || '100%',
        height: height || '100%',
      }}
    >
      <Image
        src={imageURL}
        alt={alt}
        width={width}
        fill={fill}
        style={{
          ...style,
          objectFit: 'contain', // Ensures the image fills the container while aligning with edges
          objectPosition: 'center', // Keeps the image centered
          margin: '-4px', // Slightly enlarges the image to cover the edges of the card
        }}
        height={height}
        sizes={sizes}
        className={classname}
      />
    </div>
  );
}

export default ImageComponent;
