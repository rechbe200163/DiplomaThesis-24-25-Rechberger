'use client';

import { Button } from '@/components/ui/button';
import { removeFromCart } from '@/lib/actions/product.actions';
import { Loader2, Trash2 } from 'lucide-react';
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
      <Button
        disabled={isPending}
        variant='ghost'
        size='icon'
        className='text-muted-foreground hover:text-destructive'
      >
        {isPending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          </>
        ) : (
          <>
            <Trash2 className='h-4 w-4' />
            <span className='sr-only'>Remove item</span>
          </>
        )}
      </Button>
    </form>
  );
}

export default RemoveFromCart;
