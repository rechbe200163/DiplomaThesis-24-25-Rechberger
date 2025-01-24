import React from 'react';
import { auth } from '@/auth';
import { AddressForm } from '@/components/forms/dashboard/AddressForm';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { getCustomerAddress } from '@/lib/data/data.address';
import { getTranslations } from 'next-intl/server';

async function UserAddressPage() {
  const session = await auth();
  if (!session) return null;
  const t = await getTranslations('Dashboard.Address');
  const customerReference = session?.user?.customerReference;
  const address = await getCustomerAddress(customerReference);

  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold'>{t('title')}</h2>
      <div className='max-w-2xl mx-auto'>
        <Card className='w-full max-w-2xl mx-auto'>
          <CardHeader>
            <div className='flex items-center space-x-2'>
              <MapPin className='w-6 h-6 text-primary' />
              <CardDescription>{t('desc')}</CardDescription>
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
