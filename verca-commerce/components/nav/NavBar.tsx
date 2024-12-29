import React, { Suspense } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';
import { IoCartOutline, IoHomeOutline } from 'react-icons/io5';
import HomeIcon from './HomeIcon';
import { Skeleton } from '../ui/skeleton';
// import SearchComponent from "../search/SearchComponent";
import { auth } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import CartIconComponent from './CartIconComponent';
import { Search } from 'lucide-react';
import SearchComponent from '../search/SearchComponent';
import { fetchUserAvatarPath as fetchUserAvatarPath } from '@/lib/data.dashboard';
import { getSignedURL } from '@/lib/utils';
import { string } from 'zod';

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
    <div className=' navbar bg-neutral-content space-x-20'>
      <div className='flex-1 gap-7 flex'>
        <Link href={'/shop'} className='text-xl font-bold'>
          <Suspense fallback={<Skeleton className='w-20 h-4' />}>
            <HomeIcon />
          </Suspense>
        </Link>
        <NavLinks />
      </div>
      <SearchComponent placeholder='Search for products...' />
      <div className='flex items-center space-x-6 pr-5 w-fit'>
        <CartIconComponent />
        {session ? (
          <Link href='/profile'>
            <Avatar>
              <AvatarImage src={imageURL!} className='object-cover' />
              <AvatarFallback className='bg-success-600 text-black'>
                {session.user.lastName[0] + session.user.firstName![0]}
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Link href='/auth/signin'>logIn</Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
