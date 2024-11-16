import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import NavLinksProfile from './NavLinksProfile';
import { HomeIcon } from '@radix-ui/react-icons/dist/HomeIcon';
import { ChevronDown, LucideListOrdered } from 'lucide-react';
import { PiInvoice } from 'react-icons/pi';
import Link from 'next/link';
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Collapsible } from '@radix-ui/react-collapsible';

export function AppSidebar() {
  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarHeader>
        <div className='flex items-center justify-center'>
          <Image
            src='/assets/images/logo.svg'
            width={200}
            height={200}
            alt='Logo'
            className='w-8 h-8'
          />
          <h1 className='text-lg font-bold ml-2'>Verca</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                History
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <NavLinksProfile />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
