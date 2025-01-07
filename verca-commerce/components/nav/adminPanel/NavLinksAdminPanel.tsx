'use client';

import Link from 'next/link';
import {
  Box,
  ShoppingCart,
  Users,
  Package,
  FileText,
  Truck,
  Settings,
  HomeIcon,
  MapPinIcon,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PiAddressBook } from 'react-icons/pi';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: Box },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  {
    name: 'Addresses',
    href: '/dashboard/addresses',
    icon: PiAddressBook,
  },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Invoices', href: '/dashboard/invoices', icon: FileText },
  { name: 'Routes', href: '/dashboard/routes', icon: Truck },
  { name: 'Settings', href: '/dashboard/site-config', icon: Settings },
];

export default function NavLinksAdminPanel() {
  // Das passende Array basierend auf linkType auswählen
  const pathname = usePathname();

  console.log('pathname: ', pathname);

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
