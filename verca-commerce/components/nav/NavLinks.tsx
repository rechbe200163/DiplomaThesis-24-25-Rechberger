'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function NavLinks() {
  const pathname = usePathname();

  const links = [{ label: 'Alle Produkte', href: '/search' }];

  return (
    <nav>
      <ul className='flex flex-row space-x-5 text-lg font-medium'>
        {links.map((link, index) => (
          <li key={index}>
            <Link
              key={index}
              href={link.href}
              className={cn('text-base-100 hover:underline ', {
                'font-medium hover:bg-neutral-content underline ':
                  pathname === link.href,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavLinks;
