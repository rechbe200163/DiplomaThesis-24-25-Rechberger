'use client';

import { removeFromCart } from '@/lib/actions/product.actions';
import { useActionState } from 'react';

function RemoveFromCart({ productId }: { productId: string }) {
  const removeFromCartId = removeFromCart.bind(null, productId); // Adjusted binding here
  const [formState, action, isPending] = useActionState(removeFromCartId, {
    success: false,
    errors: {
      title: [''],
    },
  });
  return (
    <form action={action} className='flex items-center'>
      <button
        type='submit'
        disabled={isPending}
        className='badge badge-error font-bold'
      >
        {isPending ? (
          <>
            <span className='loading loading-spinner loading-xs' />
            &nbsp; Removing
          </>
        ) : (
          'Remove'
        )}
      </button>
      {formState?.errors && (
        <div className='text-error text-sm mt-2'>
          {formState?.errors.title.join(', ')}
        </div>
      )}
    </form>
  );
}

export default RemoveFromCart;
