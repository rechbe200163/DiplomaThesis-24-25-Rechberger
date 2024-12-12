import React from 'react';
import Image from 'next/image';
import { cn, getSignedURL } from '@/lib/utils';
import { unstable_cacheLife as cacheLife } from 'next/cache';

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
  // wait 5 seconds
  const imageURL = await getSignedURL(imagePath, widht, height);
  return <Image src={imageURL} alt={alt} width={widht} height={height} />;
}

export default ImageComponent;
