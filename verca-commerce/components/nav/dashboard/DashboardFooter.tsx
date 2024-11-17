import { auth } from '@/auth';
import SignOutComponent from '@/components/auth/signOut';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { ChevronUp, LogOut, User, User2, User2Icon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

async function UserAvatar() {
  const session = await auth();

  return (
    <>
      <Avatar>
        <AvatarImage src={session?.user.image!} />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
      <span>{session?.user.email}</span>
    </>
  );
}

async function DashboardFooter() {
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuSubButton>
            <UserAvatar />
            <SignOutComponent />
          </SidebarMenuSubButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}

export default DashboardFooter;
