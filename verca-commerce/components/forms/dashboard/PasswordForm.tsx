'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { updatePassword } from '@/lib/actions/user.actions';
import { Loader2 } from 'lucide-react';
import { useActionState } from 'react';

import { useEffect } from 'react';

export function PasswordForm() {
  const [formState, action, isPending] = useActionState(updatePassword, {
    success: false,
    errors: {
      title: [''],
    },
  });

  useEffect(() => {
    if (formState.success) {
      toast({
        title: 'Success!',
        description: 'Your password has been updated successfully.',
      });
    }
  }, [formState.success]);

  useEffect(() => {
    if (formState.errors?.title && formState.errors !== undefined) {
      toast({
        title: 'Error!',
        description: formState.errors.title.join(' '),
        variant: 'destructive',
      });
    }
  }, [formState.errors]); // Updated the dependency array

  return (
    <form action={action} className='space-y-8'>
      <div className='space-y-2'>
        <Label htmlFor='currentPassword'>Current Password</Label>
        <Input type='password' name='currentPassword' placeholder='********' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='newPassword'>New Password</Label>
        <Input type='password' name='newPassword' placeholder='********' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='confirmPassword'>Confirm Password</Label>
        <Input type='password' name='confirmPassword' placeholder='********' />
      </div>

      <Button type='submit' disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className='animate-spin' size={24} />
            <span className='ml-2'>Updating Password</span>
          </>
        ) : (
          'Update Password'
        )}
      </Button>
    </form>
  );
}
