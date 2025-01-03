import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { ChevronDown, HelpCircle, UserCog } from 'lucide-react';
import { PiShoppingBagBold } from 'react-icons/pi';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import DashboardFooter from '../dashboard/DashboardFooter';
import NavLinksProfile from '../dashboard/NavLinksProfile';
import CompanyIconComponent from '../dashboard/CompanyIconComponent';
import NavLinksAdminPanel from './NavLinksAdminPanel';

export function AdminPabelSidebar() {
  return (
    <Sidebar collapsible='offcanvas' variant='floating'>
      <SidebarHeader>
        <CompanyIconComponent />
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <PiShoppingBagBold className='mr-1' />
                Administration
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <NavLinksAdminPanel linkType='administration' />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <UserCog className='mr-1' />
                Account
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <NavLinksAdminPanel linkType='account' />
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
