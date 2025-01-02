import React from 'react';
import { auth } from '@/auth';
import { getCustomerAddress } from '@/lib/data.dashboard';

import { AddressForm } from '@/components/forms/dashboard/AddressForm';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { MapPin } from 'lucide-react';

async function UserAddressPage() {
  const session = await auth();
  if (!session) return null;
  const customerReference = session?.user?.customerReference;

  const address = await getCustomerAddress(customerReference);

  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold'>Address Details</h2>
      <div className='max-w-2xl mx-auto'>
        <Card className='w-full max-w-2xl mx-auto'>
          <CardHeader>
            <div className='flex items-center space-x-2'>
              <MapPin className='w-6 h-6 text-primary' />
              <CardDescription>Update your shipping address</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <AddressForm address={address} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default UserAddressPage;
