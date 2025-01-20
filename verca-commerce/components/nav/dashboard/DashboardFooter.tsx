import { auth } from '@/auth';
import SignOutComponent from '@/components/auth/signOut';
import UserAvatarComponent from '@/components/helpers/UserAvatarComponent';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { fetchUserAvatarPath } from '@/lib/data/data.customer';
import React from 'react';

async function DashboardFooter() {
  const session = await auth();
  const customerReference = session?.user.customerReference;
  if (customerReference === undefined) {
    throw new Error('Customer reference is undefined');
  }
  const { avatarPath } = await fetchUserAvatarPath(customerReference);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuSubButton>
          <UserAvatarComponent avatarPath={avatarPath} />
          <span>{session?.user.email}</span>
          {/* Wrapped in a single parent element */}
          <SignOutComponent />
        </SidebarMenuSubButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default DashboardFooter;
