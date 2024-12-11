import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { getSiteConfig } from '@/lib/data.shop';
import ImageComponent from '@/components/images/ImagesConponent';

async function CompanyIconComponent() {
  const siteConfig = await getSiteConfig();
  return (
    <nav>
      <Link
        href='/shop'
        className='mb-12 cursor-pointer flex items-center gap-2'
      >
        <ImageComponent
          imagePath={siteConfig.logoPath!}
          alt={siteConfig.companyName}
          widht={400}
          height={400}
          classname='w-full rounded-t-xl'
        />
        <h1 className='sidebar-logo'>{siteConfig?.companyName || 'Horizon'}</h1>
      </Link>
    </nav>
  );
}

export default CompanyIconComponent;
