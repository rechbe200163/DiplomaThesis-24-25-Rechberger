import { auth } from '@/auth';
import { Input } from '@/components/ui/input';
import { fetchUser } from '@/lib/data.shop';
import React from 'react';

async function UserDetailsCard() {
  const session = await auth();
  const user = await fetchUser(session!.user.id);
  return (
    <div className='card card-body'>
      <h1 className='card-title'>User Details</h1>
      <Input
        className='card-text'
        defaultValue={user.firstName || 'First Name'}
        type='text'
      />
      <Input className='card-text' defaultValue={user.lastName} type='text' />
      <Input className='card-text' defaultValue={user.email} type='text' />
      <Input
        className='card-text'
        defaultValue={user.phoneNumber}
        type='text'
      />
      <Input className='card-text' defaultValue={'********'} type='password' />
    </div>
  );
}

export default UserDetailsCard;
