import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar';
import NavLinksProfile from './NavLinksProfile';
import { ChevronDown, UserCog } from 'lucide-react';
import { PiShoppingBagBold } from 'react-icons/pi';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import DashboardFooter from './DashboardFooter';
import CompanyIconComponent from './CompanyIconComponent';
import { useTranslations } from 'next-intl';

export function DashboardSidebar() {
  const t = useTranslations('NavLinks.sidebar.sections');

  return (
    <Sidebar variant='sidebar' className='w-48'>
      <SidebarHeader className='flex items-center justify-center'>
        <CompanyIconComponent />
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <UserCog className='mr-1' />
                {t('account')}
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
                {t('shop')}
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
      </SidebarContent>
      <SidebarFooter>
        <DashboardFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
