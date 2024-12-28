'use client';

import { updateQuantity } from '@/lib/actions/product.actions';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '../../ui/select';
import { SelectTrigger } from '@radix-ui/react-select';
import { useActionState } from 'react';
import { Button } from '../../ui/button';
import { MinusIcon, Plus, PlusIcon } from 'lucide-react';

function IncreaseProductQuantity({
  productId,
  quantity,
  stock,
}: {
  productId: string;
  quantity: number;
  stock: number;
}) {
  // Bind updateQuantity to productId
  const increaseProductQuantity = updateQuantity.bind(null, productId);
  const [formState, action, isPending] = useActionState(
    increaseProductQuantity,
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
        className='h-8 w-8 rounded-l-none'
        type='submit'
        disabled={quantity >= stock || isPending}
      >
        <Plus className='h-3 w-3' />
        <input type='hidden' name='quantity' value={1} />
        <span className='sr-only'>Increase quantity</span>
      </Button>
    </form>
  );
}

export default IncreaseProductQuantity;
