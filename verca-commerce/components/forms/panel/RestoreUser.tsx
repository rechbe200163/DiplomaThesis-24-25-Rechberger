'use client';
import { Button } from '@/components/ui/button';
import { restoreUser } from '@/lib/actions/user.actions';
import { ArchiveRestore, Loader2, Trash2 } from 'lucide-react';
import React, { useActionState } from 'react';

const RestoreUser = ({ customerReference }: { customerReference: number }) => {
  const [formState, action, isPending] = useActionState(
    restoreUser.bind(null, customerReference),
    {
      success: false,
      errors: {
        title: [''],
      },
    }
  );
  return (
    <form action={action} className='space-y-4'>
      <Button
        type='submit'
        size='icon'
        disabled={isPending}
        variant='ghost'
        className='hover:text-green-500'
      >
        {isPending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
          </>
        ) : (
          <>
            <ArchiveRestore className='mr-2 h-4 w-4 ' />
          </>
        )}
      </Button>
      {formState.errors && formState.errors.title.length > 0 && (
        <div className='text-red-500 text-sm'>{formState.errors.title}</div>
      )}
    </form>
  );
};

export default RestoreUser;
