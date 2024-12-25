import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import NavLinksProfile from './NavLinksProfile';
import { ChevronDown, HelpCircle, UserCog } from 'lucide-react';
import { PiShoppingBagBold } from 'react-icons/pi';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import DashboardFooter from './DashboardFooter';
import CompanyIconComponent from './CompanyIconComponent';
import ImageComponent from '@/components/images/ImageComponent';

export function AppSidebar() {
  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarHeader>
        <CompanyIconComponent />
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <UserCog className='mr-1' />
                Details
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <NavLinksProfile linkType='account' />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible defaultOpen className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <PiShoppingBagBold className='mr-1' />
                Shopping
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <NavLinksProfile linkType='shopping' />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible defaultOpen className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <HelpCircle className='mr-1' />
                Help
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <NavLinksProfile linkType='support' />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <DashboardFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
