import Link from 'next/link';
import Image from 'next/image';
import React, { Suspense } from 'react';

import ImageComponent from '@/components/images/ImageComponent';
import ImageSkeleton from '@/components/images/ImageSkeleton';
import { getSiteConfig } from '@/lib/data/data.siteConfig';

async function CompanyIconComponent() {
  const siteConfig = await getSiteConfig();
  return (
    <nav>
      <Link
        href='/shop'
        className='cursor-pointer flex items-center justify-center'
      >
        <Suspense fallback={<ImageSkeleton />}>
          <ImageComponent
            imagePath={siteConfig.logoPath!}
            alt={siteConfig.companyName}
            width={400}
            height={400}
            classname='w-40 h-40 rounded-lg'
          />
        </Suspense>
        {!siteConfig.logoPath && (
          <h1 className='sidebar-logo'>{siteConfig?.companyName || 'Home'}</h1>
        )}
      </Link>
    </nav>
  );
}

export default CompanyIconComponent;
