import Link from 'next/link';
import clsx from 'clsx';
import {
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  HeartIcon,
  HelpCircleIcon,
  HomeIcon,
  LucideListOrdered,
  MapPinIcon,
  StarIcon,
  TrashIcon,
} from 'lucide-react';
import { PiInvoice } from 'react-icons/pi';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import React from 'react';

const accountLinks = [
  { name: 'Account', href: '/profile', icon: HomeIcon },
  { name: 'Addresses', href: '/profile/addresses', icon: MapPinIcon },
  {
    name: 'Payment Methods',
    href: '/profile/payment-methods',
    icon: CreditCardIcon,
  },
];

const shoppingLinks = [
  { name: 'Orders', href: '/profile/orders', icon: LucideListOrdered },
  { name: 'Wishlist', href: '/profile/wishlist', icon: HeartIcon },
  { name: 'Invoices', href: '/profile/invoices', icon: PiInvoice },
  { name: 'Favorites', href: '/profile/favorites', icon: StarIcon },
];

const supportLinks = [
  { name: 'Support', href: '/profile/support', icon: HelpCircleIcon },
  { name: 'Notifications', href: '/profile/notifications', icon: BellIcon },
  { name: 'Activity Log', href: '/profile/activity', icon: ClockIcon },
];

const accountDangerZone = [
  { name: 'Delete Account', href: '/profile/delete-account', icon: TrashIcon },
];

// Objekt zur Zuordnung der linkTypes zu den jeweiligen Link-Arrays
const linksMap = {
  account: accountLinks,
  shopping: shoppingLinks,
  support: supportLinks,
  danger: accountDangerZone,
};

type LinkType = 'account' | 'shopping' | 'support' | 'danger';

export default function NavLinksProfile({ linkType }: { linkType: LinkType }) {
  // Das passende Array basierend auf linkType auswählen
  const links = linksMap[linkType] || [];

  return (
    <SidebarMenu>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton asChild>
              <Link href={link.href}>
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
