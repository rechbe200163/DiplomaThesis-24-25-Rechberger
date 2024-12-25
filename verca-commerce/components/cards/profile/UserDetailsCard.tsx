import { auth } from '@/auth';
import { Input } from '@/components/ui/input';
import { fetchUser } from '@/lib/data.shop';
import React from 'react';

async function UserDetailsCard() {
  const session = await auth();
  const user = await fetchUser(session?.user.customerReference!);
  return (
    <div className='flex flex-col p-6 bg-white shadow-lg rounded-lg w-full'>
      <h1 className='text-2xl font-semibold mb-6 text-center'>User Details</h1>
      <Input
        className='mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
        defaultValue={user.firstName!}
        type='text'
        placeholder='First Name'
      />
      <Input
        className='mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
        defaultValue={user.lastName!}
        type='text'
        placeholder='Last Name'
      />
      <Input
        className='mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
        defaultValue={user.email}
        type='text'
        placeholder='Email'
      />
      <Input
        className='mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
        defaultValue={user.phoneNumber}
        type='text'
        placeholder='Phone Number'
      />
      <Input
        className='mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
        type='password'
        placeholder='Password'
      />
    </div>
  );
}

export default UserDetailsCard;
