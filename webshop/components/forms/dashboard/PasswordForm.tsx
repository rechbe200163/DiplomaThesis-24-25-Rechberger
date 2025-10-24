'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { updatePassword } from '@/lib/actions/user.actions';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

import { useEffect } from 'react';

export function PasswordForm() {
  const t = useTranslations('Dashboard.Account.password');
  const [formState, action, isPending] = useActionState(updatePassword, {
    success: false,
    errors: {
      title: [''],
    },
  });

  useEffect(() => {
    if (formState.success) {
      toast({
        description: t('success'),
      });
    }
  }, [formState.success, t]);

  useEffect(() => {
    if (
      (formState.errors?.title?.length ?? 0) > 0 &&
      formState.errors?.title[0] !== ''
    ) {
      toast({
        title: t('error'),
        description: (formState.errors?.title ?? []).join(' '),
        variant: 'destructive',
      });
    }
  }, [formState.errors, t]);

  return (
    <form action={action} className='space-y-8'>
      <div className='space-y-2'>
        <Label htmlFor='currentPassword'>{t('current_password')}</Label>
        <Input
          type='password'
          name='currentPassword'
          placeholder='********'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='newPassword'>{t('new_password')}</Label>
        <Input
          type='password'
          name='newPassword'
          placeholder='********'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='confirmPassword'>{t('confirm_password')}</Label>
        <Input
          type='password'
          name='confirmPassword'
          placeholder='********'
          required
        />
      </div>

      <Button type='submit' disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className='animate-spin' size={24} />
            <span className='ml-2'>{t('button')}</span>
          </>
        ) : (
          t('button')
        )}
      </Button>
    </form>
  );
}
