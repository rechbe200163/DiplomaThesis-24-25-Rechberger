import { auth } from '@/auth';
import SignOutComponent from '@/components/auth/signOut';
import UploadForm from '@/components/forms/dashboard/UploadForm';
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
import { fetchUserAvatrPath } from '@/lib/data.dashboard';
import { getSignedURL } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Dialog } from '@radix-ui/react-dialog';
import { ChevronUp, LogOut, User, User2, User2Icon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
async function UserAvatar() {
  const session = await auth();
  const { avatarPath } = await fetchUserAvatrPath(
    session?.user.customerReference!
  );
  const imageURL = await getSignedURL(avatarPath);
  return (
    <>
      <Avatar>
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
          <Dialog>
            <DialogTrigger asChild>
              <div className='flex items-center space-x-2'>
                <UserAvatar /> {/* Wrapped in a single parent element */}
              </div>
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>Choose a new profile picture</DialogHeader>
              <UploadForm />
            </DialogContent>
          </Dialog>
          <SignOutComponent />
        </SidebarMenuSubButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default DashboardFooter;
