'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateAccount } from '@/lib/actions/user.actions';
import { Customer, BusinessSector } from '@prisma/client';
import { use, useActionState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AccountForm({
  customer,
  imageUrl,
}: {
  customer: Customer;
  imageUrl: string;
}) {
  const t = useTranslations('Dashboard.Account');
  const [formState, action, isPending] = useActionState(updateAccount, {
    success: false,
    errors: {
      title: [''],
    },
  });

  const showBusinessInfo = customer.businessSector && customer.companyNumber;

  return (
    <form action={action} className='space-y-8 pt-6'>
      <div className='flex items-center space-x-14'>
        <Avatar className='h-24 w-24'>
          <AvatarImage
            src={imageUrl}
            alt={`${customer.firstName} ${customer.lastName}`}
          />
          <AvatarFallback>
            {customer.firstName?.[0]}
            {customer.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <Label htmlFor='avatar'>{t('update_profile_picture')}</Label>
          <Input id='avatar' name='avatarPath' type='file' accept='image/*' />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='firstName'>{t('first_name')}</Label>
          <Input
            id='firstName'
            name='firstName'
            placeholder={customer.firstName || ''}
            defaultValue={customer.firstName || ''}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='lastName'>{t('last_name')}</Label>
          <Input
            id='lastName'
            name='lastName'
            placeholder={customer.lastName}
            defaultValue={customer.lastName}
          />
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>{t('email')}</Label>
        <Input
          id='email'
          name='email'
          type='email'
          placeholder={customer.email}
          defaultValue={customer.email}
        />
        <p className='text-sm text-muted-foreground'>
          {t('confirmation_email')}
        </p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='phoneNumber'>{t('phone')}</Label>
        <Input
          id='phoneNumber'
          name='phoneNumber'
          placeholder={customer.phoneNumber}
          defaultValue={customer.phoneNumber}
        />
      </div>

      {showBusinessInfo && (
        <div className='flex items-center space-x-14'>
          <div className='space-y-2'>
            <Label htmlFor='companyNumber'>{t('company_number')}</Label>
            <Input
              id='companyNumber'
              name='companyNumber'
              placeholder={customer.companyNumber || ''}
              defaultValue={customer.companyNumber || ''}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='businessSector'>{t('business_sector')}</Label>
            <Select
              name='businessSector'
              defaultValue={customer.businessSector || undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select a business sector' />
              </SelectTrigger>
              <SelectContent>
                {Object.values(BusinessSector).map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <Button type='submit' disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className='animate-spin' /> {t('button')}
          </>
        ) : (
          t('button')
        )}
      </Button>
    </form>
  );
}
