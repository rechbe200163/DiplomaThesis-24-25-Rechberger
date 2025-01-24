import Link from 'next/link';
import React, { Suspense } from 'react';
import { getSiteConfig } from '@/lib/data/data.siteConfig';
import ImageSkeleton from '@/components/images/ImageSkeleton';
import ImageComponent from '@/components/images/ImageComponent';

async function CompanyIconComponent() {
  const siteConfig = await getSiteConfig();
  return (
    <Link
      href='/'
      passHref
      style={{ width: '192px', height: '192px' }}
      className='flex items-center justify-center'
    >
      <Suspense fallback={<ImageSkeleton />}>
        <ImageComponent
          imagePath={siteConfig.logoPath!}
          alt={siteConfig.companyName}
          width={200}
          height={200}
        />
      </Suspense>
    </Link> // Placeholder content
  );
}

export default CompanyIconComponent;
