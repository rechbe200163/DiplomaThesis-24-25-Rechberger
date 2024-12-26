'use client';

import { useActionState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateUserDetails } from '@/lib/actions/user.actions';

function AddToCartForm({ customerReference }: { customerReference: number }) {
  const updateUserDetailsAction = updateUserDetails.bind(
    null,
    customerReference
  ); // Adjusted binding here
  const [formState, action, isPending] = useActionState(
    updateUserDetailsAction,
    {
      success: false,
      errors: {
        title: [''],
      },
    }
  );
  return (
    <form action={action}>
      <Button type='submit' disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 size={20} className='animate-spin' /> &nbsp; Adding to
            Cart...
          </>
        ) : (
          'Add to Cart'
        )}
      </Button>
      {formState?.errors && (
        <div className='text-error text-sm mt-2'>
          {formState?.errors.title.join(', ')}
        </div>
      )}
    </form>
  );
}

export default AddToCartForm;
