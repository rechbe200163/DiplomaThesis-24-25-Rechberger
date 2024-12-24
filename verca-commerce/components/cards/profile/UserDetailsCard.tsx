import { auth } from '@/auth';
import { Input } from '@/components/ui/input';
import { fetchUser } from '@/lib/data.shop';
import React from 'react';

async function UserDetailsCard() {
  const session = await auth();
  const user = await fetchUser(session?.user.customerReference!);
  return (
    <div className='flex flex-col p-4 bg-white shadow rounded-lg w-full max-w-sm'>
      <h1 className='text-lg font-semibold mb-4'>User Details</h1>
      <Input
        className='mb-2'
        defaultValue={user.firstName!}
        type='text'
        placeholder='First Name'
      />
      <Input
        className='mb-2'
        defaultValue={user.lastName!}
        type='text'
        placeholder='Last Name'
      />
      <Input
        className='mb-2'
        defaultValue={user.email}
        type='text'
        placeholder='Email'
      />
      <Input
        className='mb-2'
        defaultValue={user.phoneNumber}
        type='text'
        placeholder='Phone Number'
      />
      <Input className='mb-2' type='password' placeholder='Password' />
    </div>
  );
}

export default UserDetailsCard;
