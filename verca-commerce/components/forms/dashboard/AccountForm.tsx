'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateAccount } from '@/lib/actions/user.actions';
import { Customer, BusinessSector } from '@prisma/client';
import { useActionState } from 'react';
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

export function AccountForm({
  customer,
  imageUrl,
}: {
  customer: Customer;
  imageUrl: string;
}) {
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
          <Label htmlFor='avatar'>Profile Picture</Label>
          <Input id='avatar' name='avatarPath' type='file' accept='image/*' />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='firstName'>First Name</Label>
          <Input
            id='firstName'
            name='firstName'
            placeholder={customer.firstName || ''}
            defaultValue={customer.firstName || ''}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='lastName'>Last Name</Label>
          <Input
            id='lastName'
            name='lastName'
            placeholder={customer.lastName}
            defaultValue={customer.lastName}
          />
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          placeholder={customer.email}
          defaultValue={customer.email}
        />
        <p className='text-sm text-muted-foreground'>
          We'll send you a confirmation email if changed.
        </p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='phoneNumber'>Phone Number</Label>
        <Input
          id='phoneNumber'
          name='phoneNumber'
          placeholder={customer.phoneNumber}
          defaultValue={customer.phoneNumber}
        />
      </div>

      {showBusinessInfo && (
        <>
          <div className='space-y-2'>
            <Label htmlFor='companyNumber'>Company Number</Label>
            <Input
              id='companyNumber'
              name='companyNumber'
              placeholder={customer.companyNumber || ''}
              defaultValue={customer.companyNumber || ''}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='businessSector'>Business Sector</Label>
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
        </>
      )}

      <Button type='submit' disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className='animate-spin' /> Updating Account
          </>
        ) : (
          'Update Account'
        )}
      </Button>

      {/* {formState.success && (
        <p className='text-sm text-green-600'>Account updated successfully!</p>
      )}
      {formState.errors!.title && (
        <p className='text-sm text-red-600'>{formState.errors!.title}</p>
      )} */}
    </form>
  );
}
