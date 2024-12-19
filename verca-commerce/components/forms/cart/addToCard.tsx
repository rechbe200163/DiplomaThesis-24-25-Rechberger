'use client';

import { useActionState } from 'react';
import { addToCart } from '@/lib/actions/product.actions';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function AddToCartForm({ productId }: { productId: string }) {
  const addToCartAction = addToCart.bind(null, productId); // Adjusted binding here
  const [formState, action, isPending] = useActionState(addToCartAction, {
    success: false,
    errors: {
      title: [''],
    },
  });
  return (
    <form action={action}>
      <Button
        type='submit'
        disabled={isPending}
        className='bg-base-200 text-white hover:bg-base-100'
      >
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
