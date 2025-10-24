'use client';

import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '../ui/select';
import { Address } from '@prisma/client';

export default function AddressSelectComponent({
  addresses,
}: {
  addresses: Address[];
}) {
  return (
    <Select>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select an Address' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Addresses</SelectLabel>
          {addresses.map((address) => (
            <SelectItem key={address.addressId} value={address.addressId}>
              {address.streetNumber} {address.streetName}, {address.city}{' '}
              {address.postCode} {address.country}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
