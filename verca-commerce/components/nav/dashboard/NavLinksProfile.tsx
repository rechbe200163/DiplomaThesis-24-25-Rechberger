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
import React, { use } from 'react';
import { BiSupport } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const supportLinks = [
  { name: 'Support', href: '/dashboard/support', icon: BiSupport },
  { name: 'Notifications', href: '/dashboard/notifications', icon: BellIcon },
];
// Objekt zur Zuordnung der linkTypes zu den jeweiligen Link-Arrays

type LinkType = 'account' | 'shopping';

export default function NavLinksProfile({ linkType }: { linkType: LinkType }) {
  const t = useTranslations('NavLinks.sidebar');

  const accountLinks = [
    { name: t('account'), href: '/dashboard/account', icon: HomeIcon },
    { name: t('address'), href: '/dashboard/address', icon: MapPinIcon },
  ];

  const shoppingLinks = [
    { name: t('orders'), href: '/dashboard', icon: LucideListOrdered },
  ];
  const linksMap = {
    account: accountLinks,
    shopping: shoppingLinks,
  };
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
