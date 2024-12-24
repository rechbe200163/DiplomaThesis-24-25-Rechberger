import AccountComponent from '@/components/cards/profile/AccountComponent';
import UserDetailsCard from '@/components/cards/profile/UserDetailsCard';
import React from 'react';

const UserProfile = () => {
  return (
    <div className='flex flex-col md:flex-row gap-6 p-6 bg-gray-100 justify-center items-center'>
      <div className='flex-1 max-w-sm'>
        <AccountComponent />
      </div>
      <div className='flex-1 max-w-sm'>
        <UserDetailsCard />
      </div>
    </div>
  );
};

export default UserProfile;
