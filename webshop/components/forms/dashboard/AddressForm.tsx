'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { Loader2, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

import { toast } from 'sonner';
import { Address } from '@prisma/client';
import { updateAddress } from '@/lib/actions/address.actions';
import { useTranslations } from 'next-intl';

export function AddressForm({ address }: { address: Address }) {
  const t = useTranslations('Dashboard.Address');

  const [formState, action, isPending] = useActionState(updateAddress, {
    success: false,
    errors: {
      title: [''],
    },
  });

  return (
    <form action={action} className='space-y-6'>
      <Input type='hidden' name='addressId' value={address.addressId} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='streetNumber'>{t('address.street_number')}</Label>
          <Input
            id='streetNumber'
            name='streetNumber'
            defaultValue={address.streetNumber}
            className='transition-all duration-200 focus:ring-2 focus:ring-primary'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='streetName'>{t('address.street_name')}</Label>
          <Input
            id='streetName'
            name='streetName'
            defaultValue={address.streetName}
            className='transition-all duration-200 focus:ring-2 focus:ring-primary'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='city'>{t('address.city')}</Label>
          <Input
            id='city'
            name='city'
            defaultValue={address.city}
            className='transition-all duration-200 focus:ring-2 focus:ring-primary'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='state'>{t('address.state')}</Label>
          <Input
            id='state'
            name='state'
            defaultValue={address.state}
            className='transition-all duration-200 focus:ring-2 focus:ring-primary'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='postCode'>{t('address.zip_code')}</Label>
          <Input
            id='postCode'
            name='postCode'
            defaultValue={address.postCode}
            className='transition-all duration-200 focus:ring-2 focus:ring-primary'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='country'>{t('address.country')}</Label>
          <Input
            id='country'
            name='country'
            defaultValue={address.country}
            className='transition-all duration-200 focus:ring-2 focus:ring-primary'
          />
        </div>
      </div>

      <div className='flex justify-end'>
        <Button
          type='submit'
          disabled={isPending}
          className='w-full sm:w-auto transition-all duration-200 hover:bg-primary/90'
        >
          {isPending ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
              {t('button_loading')}
            </>
          ) : (
            <>
              <CheckCircle className='mr-2 h-4 w-4' /> {t('button')}
            </>
          )}
        </Button>
      </div>

      {formState.success && (
        <p className='text-sm text-green-600 flex items-center'>
          <CheckCircle className='mr-2 h-4 w-4' /> {t('success')}
        </p>
      )}
      {formState.errors?.title[0] && (
        <p className='text-sm text-red-600 flex items-center'>
          <AlertCircle className='mr-2 h-4 w-4' /> {formState.errors.title[0]}
        </p>
      )}
    </form>
  );
}
