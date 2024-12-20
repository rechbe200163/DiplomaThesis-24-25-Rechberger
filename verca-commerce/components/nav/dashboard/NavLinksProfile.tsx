'use client';

import Link from 'next/link';
import {
  BellIcon,
  CreditCardIcon,
  HomeIcon,
  LucideListOrdered,
  MapPinIcon,
} from 'lucide-react';
import { PiInvoice } from 'react-icons/pi';
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
  { name: 'Account', href: '/profile', icon: HomeIcon },
  { name: 'Addresses', href: '/profile/addresses', icon: MapPinIcon },
];

const shoppingLinks = [
  { name: 'Orders', href: '/profile/orders', icon: LucideListOrdered },
  { name: 'Invoices', href: '/profile/invoices', icon: PiInvoice },
];

const supportLinks = [
  { name: 'Support', href: '/profile/support', icon: BiSupport },
  { name: 'Notifications', href: '/profile/notifications', icon: BellIcon },
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
                  'flex items-center px-4 py-2 rounded-lg hover:bg-neutral',
                  pathname === link.href && 'bg-neutral-content'
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
