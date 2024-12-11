import React from 'react';
import Image from 'next/image';
import { getSignedURL } from '@/lib/utils';
import { ImageDown } from 'lucide-react';

interface ImagesConponentProps {
  imagePath: string;
  alt: string;
  widht: number;
  height: number;
  classname: string;
}

async function ImageComponent({
  imagePath,
  alt,
  widht,
  height,
  classname,
}: ImagesConponentProps) {
  const imageURL = await getSignedURL(imagePath, widht, height);
  return (
    <Image
      src={imageURL}
      alt={alt}
      width={widht}
      height={height}
      className={classname}
    />
  );
}

export default ImageComponent;
