'use client';

import { updateQuantity } from '@/lib/actions/product.actions';
import { useActionState } from 'react';
import { Button } from '../../ui/button';
import { Minus, MinusIcon } from 'lucide-react';

function DecreaseProductQuantity({
  productId,
  quantity,
  stock,
}: {
  productId: string;
  quantity: number;
  stock: number;
}) {
  // Bind updateQuantity to productId
  const decreaseProductQuantity = updateQuantity.bind(null, productId);
  const [formState, action, isPending] = useActionState(
    decreaseProductQuantity,
    {
      success: false,
      errors: {
        title: [''],
      },
    }
  );

  return (
    <form action={action} className='flex items-center'>
      <Button
        variant='ghost'
        size='icon'
        className='h-8 w-8 rounded-r-none'
        type='submit'
        disabled={stock === 0 || quantity <= 1 || isPending}
      >
        <Minus className='h-3 w-3' />
        <input type='hidden' name='quantity' value={-1} />
        <span className='sr-only'>Decrease quantity</span>
      </Button>
    </form>
  );
}

export default DecreaseProductQuantity;
