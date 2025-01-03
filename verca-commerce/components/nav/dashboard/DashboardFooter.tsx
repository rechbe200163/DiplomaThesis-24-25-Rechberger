import { auth } from '@/auth';
import SignOutComponent from '@/components/auth/signOut';
import UserAvatar from '@/components/helpers/UserAvatarcComponent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { fetchUserAvatarPath } from '@/lib/data.dashboard';
import { getSignedURL } from '@/lib/utils';
import { User2Icon } from 'lucide-react';
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
          <UserAvatar avatarPath={avatarPath} />{' '}
          {/* Wrapped in a single parent element */}
          <SignOutComponent />
        </SidebarMenuSubButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default DashboardFooter;
