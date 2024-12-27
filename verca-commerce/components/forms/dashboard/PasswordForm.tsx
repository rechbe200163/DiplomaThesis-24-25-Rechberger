'use client';

import { Button, Button as FormSubmitButton } from '@/components/ui/button';
import { FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updatePassword } from '@/lib/actions/user.actions';
import { useActionState } from 'react';

export function PasswordForm() {
  const [formState, action, isPending] = useActionState(updatePassword, {
    success: false,
    errors: {
      title: [''],
    },
  });

  return (
    <form action={action} className='space-y-8'>
      <Input type='password' />
      <Input type='password' />

      <Input type='password' />
      <Button type='submit'>Change Password</Button>
    </form>
  );
}
