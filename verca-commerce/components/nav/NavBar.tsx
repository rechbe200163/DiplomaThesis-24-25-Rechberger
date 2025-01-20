import React, { Suspense } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';
import HomeIcon from './HomeIcon';
import { Skeleton } from '../ui/skeleton';
import { auth } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import CartIconComponent from './CartIconComponent';
import SearchComponent from '../search/SearchComponent';
import { getSignedURL } from '@/lib/utils';
import { fetchUserAvatarPath } from '@/lib/data/data.customer';
import { Menu } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { DialogTitle } from '@/components/ui/dialog';

async function NavBar() {
  let imageURL: string | null = null;
  const session = await auth();
  if (session) {
    const { avatarPath } = await fetchUserAvatarPath(
      session?.user.customerReference!
    );
    if (avatarPath) {
      imageURL = await getSignedURL(avatarPath);
    }
  }

  return (
    <div className='navbar bg-neutral-content'>
      <div className='flex-1 items-center'>
        <Drawer>
          <DrawerTrigger asChild>
            <button className='btn btn-ghost lg:hidden'>
              <Menu />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <DialogTitle>
              {/* <VisuallyHidden>Navigation Menu</VisuallyHidden> */}
            </DialogTitle>
            <div className='mt-4 mb-8 px-4'>
              <NavLinks />
              <div className='mt-4'>
                <SearchComponent placeholder='Search for products...' />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <Link href={'/shop'} className='text-xl font-bold ml-2'>
          <Suspense fallback={<Skeleton className='w-20 h-4' />}>
            <HomeIcon />
          </Suspense>
        </Link>
        <div className='hidden lg:flex ml-6'>
          <NavLinks />
        </div>
      </div>
      <div className='hidden lg:flex flex-1 justify-center'>
        <SearchComponent placeholder='Search for products...' />
      </div>
      <div className='flex items-center space-x-4 pr-2'>
        <CartIconComponent />
        {session ? (
          <Link href='/dashboard'>
            <Avatar>
              <AvatarImage src={imageURL!} className='object-cover' />
              <AvatarFallback className='bg-success-600 text-black'>
                {session.user.lastName[0] +
                  (session.user.firstName ? session.user.firstName[0] : '')}
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Link href='/auth/signin' className='btn btn-ghost'>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
