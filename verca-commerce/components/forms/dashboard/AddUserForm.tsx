'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Address, Role } from '@prisma/client';
import AddressSelectComponent from '@/components/helpers/AddressSelectComponent';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface AddUserFormProps {
  addresses: Address[];
}

export default function AddUserForm({ addresses }: AddUserFormProps) {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb className='mb-6'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/dashboard'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/dashboard/customers'>
              Customers
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className='text-3xl font-bold tracking-tight mb-6'>
        Add New Customer
      </h2>

      <Card className='bg-white shadow-md p-6'>
        <form className='space-y-6'>
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Customer Details Section */}
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold mb-4'>Customer Details</h3>
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
                <div>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input
                    id='firstName'
                    name='firstName'
                    placeholder='Enter first name'
                  />
                </div>
                <div>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input
                    id='lastName'
                    name='lastName'
                    placeholder='Enter last name'
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Enter email address'
                  required
                />
              </div>
              <div>
                <Label htmlFor='phoneNumber'>Phone Number</Label>
                <Input
                  id='phoneNumber'
                  name='phoneNumber'
                  placeholder='Enter phone number'
                  required
                />
              </div>
              <div>
                <div className='flex justify-between items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <span className='text-sm text-gray-500'>
                    Will be auto-generated and sent to the customer via email
                  </span>
                </div>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Will be auto-generated'
                  disabled={true}
                  required
                />
              </div>
              <div>
                <Label htmlFor='address'>Address</Label>
                <AddressSelectComponent addresses={addresses} />
              </div>
            </div>

            {/* Business Customer Information Section */}
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold mb-4'>
                Business Customer Information
              </h3>
              <div>
                <Label htmlFor='companyNumber'>Company Number</Label>
                <Input
                  id='companyNumber'
                  name='companyNumber'
                  placeholder='Enter company number'
                />
              </div>
              <div>
                <Label htmlFor='role'>Role</Label>
                <Select name='role'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a role' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(Role).map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='businessSector'>Business Sector</Label>
                <Input
                  id='businessSector'
                  name='businessSector'
                  placeholder='Enter business sector'
                />
              </div>
            </div>
          </div>

          <div className='flex justify-end space-x-2 pt-4'>
            <Button variant='outline' asChild>
              <Link href='/dashboard/admin/users'>Cancel</Link>
            </Button>
            <Button type='submit'>Add Customer</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
