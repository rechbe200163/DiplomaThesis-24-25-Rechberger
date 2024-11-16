'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { HomeIcon, LucideListOrdered } from 'lucide-react';
import { PiInvoice } from 'react-icons/pi';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Item } from '@radix-ui/react-select';
import { cn } from '@/lib/utils';

const links = [
  { name: 'Account', href: '/profile', icon: HomeIcon },
  { name: 'Orders', href: '/profile/orders', icon: LucideListOrdered },
  { name: 'Invoices', href: '/profile/invoices', icon: PiInvoice },
];

export default function NavLinksProfile() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {/* <Search placeholder='Search ' /> */}
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              asChild
              className={cn(
                'flex items-center justify-start w-full px-4 py-2',
                pathname === link.href ? 'bg-gray-300' : 'hover:bg-gray-100'
              )}
            >
              <Link href={link.href}>
                <LinkIcon className='w-6 h-6' />
                <span>{link.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
