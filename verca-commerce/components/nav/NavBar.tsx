import React, { Suspense } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';
import HomeIcon from './HomeIcon';
import { Skeleton } from '@/components/ui/skeleton';
import { auth, signOut } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CartIconComponent from './CartIconComponent';
import SearchComponent from '../search/SearchComponent';
import { getSignedURL } from '@/lib/utils';
import { fetchUserAvatarPath } from '@/lib/data/data.customer';
import { LogOut, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { DialogTitle } from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    <nav className='bg-bg-gray-300-100 text-gray-800 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Navbar Start */}
          <div className='flex items-center'>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='lg:hidden mr-2 text-gray-800 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
                >
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Menü Öffnen</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-80 bg-white text-gray-800'>
                <VisuallyHidden>
                  <DialogTitle>Navigations Menu</DialogTitle>
                </VisuallyHidden>
                <div className='mt-6 space-y-4'>
                  <NavLinks />
                  <SearchComponent placeholder='Suche nach Produkten' />
                </div>
              </SheetContent>
            </Sheet>
            <Link
              href='/shop'
              className='flex items-center text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors'
            >
              <Suspense fallback={<Skeleton className='w-8 h-8' />}>
                <HomeIcon />
              </Suspense>
            </Link>
          </div>

          {/* Navbar Center */}
          <div className='hidden lg:flex items-center space-x-20'>
            <NavLinks />
            <div className='hidden lg:block w-64'>
              <SearchComponent placeholder='Suche nach Produkten' />
            </div>
          </div>

          {/* Navbar End */}
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              size='icon'
              className='relative text-gray-800 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
            >
              <CartIconComponent />
            </Button>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-full focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
                  >
                    <Avatar>
                      <AvatarImage src={imageURL!} />
                      <AvatarFallback className='bg-gray-200 text-gray-800'>
                        {session.user.lastName[0] +
                          (session.user.firstName
                            ? session.user.firstName[0]
                            : '')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='w-56 bg-white text-gray-800'
                >
                  <DropdownMenuItem asChild>
                    <Link href='/dashboard' className='flex items-center'>
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href='/dashboard/account'
                      className='flex items-center'
                    >
                      <span>Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form
                      action={async () => {
                        'use server';
                        await signOut();
                      }}
                    >
                      <button
                        type='submit'
                        className='flex items-center w-full justify-between'
                      >
                        <span>Abmelden</span>
                        <LogOut className='mr-2 h-4 w-4' />
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                variant='ghost'
                className='text-gray-800 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
              >
                <Link href='/auth/signin'>Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
