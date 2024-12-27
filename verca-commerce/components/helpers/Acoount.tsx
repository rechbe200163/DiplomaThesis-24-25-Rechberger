import { auth } from '@/auth';
import { fetchUser } from '@/lib/data.shop';
import React from 'react';
import { AccountForm } from '../forms/dashboard/AccountForm';
import { fetchUserAvatrPath } from '@/lib/data.dashboard';
import { getSignedURL } from '@/lib/utils';

const UpdatUserData = async () => {
  const session = await auth();
  const customer = await fetchUser(session?.user?.customerReference as number);
  let imageUrl: string | null = null;
  if (customer.avatarPath) {
    imageUrl = await getSignedURL(customer.avatarPath);
  }
  return (
    <>
      <AccountForm customer={customer} imageUrl={imageUrl!} />
    </>
  );
};

export default UpdatUserData;
