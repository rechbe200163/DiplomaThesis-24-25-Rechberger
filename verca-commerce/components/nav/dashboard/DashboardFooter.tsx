import { auth } from '@/auth';
import SignOutComponent from '@/components/auth/signOut';
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
async function UserAvatar() {
  const session = await auth();
  const { avatarPath } = await fetchUserAvatarPath(
    session?.user.customerReference!
  );
  const imageURL = await getSignedURL(avatarPath);
  return (
    <>
      <Avatar className='cursor-pointer'>
        <AvatarImage src={imageURL!} />
        <AvatarFallback>
          <User2Icon />
        </AvatarFallback>
      </Avatar>
      <span>{session?.user.email}</span>
    </>
  );
}

async function DashboardFooter() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuSubButton>
          <UserAvatar /> {/* Wrapped in a single parent element */}
          <SignOutComponent />
        </SidebarMenuSubButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default DashboardFooter;
