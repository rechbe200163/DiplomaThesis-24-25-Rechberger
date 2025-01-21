'use client';

import Link from 'next/link';
import {
  BellIcon,
  HomeIcon,
  LucideListOrdered,
  MapPinIcon,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import React from 'react';
import { BiSupport } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const accountLinks = [
  { name: 'Account', href: '/dashboard/account', icon: HomeIcon },
  { name: 'Addresses', href: '/dashboard/address', icon: MapPinIcon },
];

const shoppingLinks = [
  { name: 'Orders', href: '/dashboard', icon: LucideListOrdered },
];

const supportLinks = [
  { name: 'Support', href: '/dashboard/support', icon: BiSupport },
  { name: 'Notifications', href: '/dashboard/notifications', icon: BellIcon },
];
// Objekt zur Zuordnung der linkTypes zu den jeweiligen Link-Arrays
const linksMap = {
  account: accountLinks,
  shopping: shoppingLinks,
  support: supportLinks,
};

type LinkType = 'account' | 'shopping' | 'support';

export default function NavLinksProfile({ linkType }: { linkType: LinkType }) {
  // Das passende Array basierend auf linkType auswählen
  const pathname = usePathname();
  const links = linksMap[linkType] || [];

  return (
    <SidebarMenu>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton asChild>
              <Link
                href={link.href}
                className={cn(
                  'flex items-center px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors ease-in-out duration-200',
                  pathname === link.href &&
                    'bg-gray-300 hover:bg-gray-400 transition-colors ease-in-out duration-500'
                )}
              >
                <Icon />
                <span>{link.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
