'use client';

import { updateQuantity } from '@/lib/actions/product.actions';
import { useActionState } from 'react';
import { Button } from '../../ui/button';
import { MinusIcon } from 'lucide-react';

function DecreaseProductQuantity({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
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
      <div className='justify-items-stretch'>
        <Button
          variant={'outline'}
          size={'icon'}
          type='submit'
          disabled={quantity <= 1 || isPending}
        >
          <MinusIcon />
        </Button>
        <input type='hidden' name='update' value={-1}></input>
      </div>

      {/* Display errors if any */}
      {formState.errors?.title[0] && (
        <div className='text-error text-sm mt-2'>
          {formState.errors.title.join(', ')}
        </div>
      )}
    </form>
  );
}

export default DecreaseProductQuantity;
