'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { authSignUpFormSchema } from '@/lib/utils';
import { BusinessSector } from '@prisma/client';
import { countries } from '@/lib/objects';
import { signUp } from '@/lib/actions/user.actions';
import { useState } from 'react';
import { FormState } from '@/lib/form.types';
import { useToast } from '@/hooks/use-toast';

// Enhancements
export function SignUpForm() {
  const FormSchema = authSignUpFormSchema();
  const [message, setMessage] = useState<FormState | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      phoneNumber: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      companyNumber: '',
      businessSector: BusinessSector['TECHNOLOGY'],
      city: '',
      country: '',
      postCode: '',
      state: '',
      streetNumber: '',
      streetName: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = signUp(
      data.email,
      data.password,
      data.confirmPassword,
      data.firstName,
      data.lastName,
      data.companyNumber,
      data.businessSector,
      data.phoneNumber,
      data.city,
      data.country,
      data.postCode,
      data.state,
      data.streetName,
      data.streetNumber
    );
    if (response) {
      response.then((res) => {
        setMessage(res);
      });
    }
    toast({
      title: message?.success ? 'Success' : 'Error',
      description: message?.success
        ? message?.message
        : message?.errors?.title || 'An error occurred',
      variant: message?.success ? 'success' : 'destructive',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        {/* Personal Information Section */}
        <div className={'border rounded-lg p-4 mb-6 shadow-md bg-white'}>
          <h2 className='text-xl font-bold mb-4'>Personal Information</h2>
          <div className={'flex flex-col md:flex-row gap-5'}>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder='John' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className={'border rounded-lg p-4 mb-6 shadow-md bg-white'}>
          <h2 className='text-xl font-bold mb-4'>Contact Information</h2>
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder='+42 664 2160519' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='example@test.com'
                    {...field}
                    type='email'
                    autoComplete='email'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Business Information Section */}
        <div className={'border rounded-lg p-4 mb-6 shadow-md bg-white'}>
          <h2 className='text-xl font-bold mb-4'>Business Information</h2>
          <FormField
            control={form.control}
            name='businessSector'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Sector</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Business Sector' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(BusinessSector).map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='companyNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Number</FormLabel>
                <FormControl>
                  <Input placeholder='Ex.: 12312312312' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address Section */}
        <div className={'border rounded-lg p-4 mb-6 shadow-md bg-white'}>
          <h2 className='text-xl font-bold mb-4'>Address</h2>
          <div className={'flex flex-col md:flex-row gap-5'}>
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select your Country' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Your State' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={'flex flex-col md:flex-row gap-5'}>
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Your City' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='postCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder='E.g. 8235' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={'flex flex-col md:flex-row gap-5'}>
            <FormField
              control={form.control}
              name='streetName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter the name of your street'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='streetNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter the number of your street'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Account Details Section */}
        <div className={'border rounded-lg p-4 mb-6 shadow-md bg-white'}>
          <h2 className='text-xl font-bold mb-4'>Account Details</h2>
          <div className={'flex flex-col md:flex-row gap-5'}>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your password'
                      {...field}
                      type='password'
                      autoComplete='new-password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Your Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Confirm Your Password'
                      {...field}
                      type='password'
                      autoComplete='new-password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          className='w-full mt-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg'
          type='submit'
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
