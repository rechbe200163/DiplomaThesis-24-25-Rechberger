import Link from 'next/link';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { getSiteConfig } from '@/lib/data.shop';
import ImageComponent from '@/components/images/ImageComponent';
import ImageSkeleton from '@/components/images/ImageSkeleton';

async function CompanyIconComponent() {
  const siteConfig = await getSiteConfig();
  return (
    <nav>
      <Link
        href='/shop'
        className='mb-12 cursor-pointer flex items-center gap-2'
      >
        <Suspense fallback={<ImageSkeleton />}>
          <ImageComponent
            imagePath={siteConfig.logoPath!}
            alt={siteConfig.companyName}
            widht={400}
            height={400}
            classname='w-full rounded-t-xl'
          />
        </Suspense>
        <h1 className='sidebar-logo'>{siteConfig?.companyName || 'Horizon'}</h1>
      </Link>
    </nav>
  );
}

export default CompanyIconComponent;
