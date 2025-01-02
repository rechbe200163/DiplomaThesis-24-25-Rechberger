'use client';

import { useActionState, useState } from 'react';
import { Minus, Plus, Loader2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addToCart } from '@/lib/actions/product.actions';
import { cn } from '@/lib/utils';

interface AddToCartFormProps {
  productId: string;
}

export default function AddToCartForm({ productId }: AddToCartFormProps) {
  const [formState, action, isPending] = useActionState(
    addToCart.bind(null, productId),
    {
      success: false,
      errors: {
        title: [''],
      },
    }
  );

  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => (prev < 10 ? prev + 1 : 10));
  };

  return (
    <form action={action} className='space-y-4'>
      <div className='flex items-center space-x-4'>
        <div className='flex items-center space-x-2'>
          <Button
            type='button'
            variant='outline'
            size='icon'
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isPending}
          >
            <Minus className='h-4 w-4' />
            <span className='sr-only'>Decrease quantity</span>
          </Button>
          <span className='w-12 text-center text-lg font-medium'>
            {quantity}
          </span>
          <input
            disabled={isPending}
            type='hidden'
            name='quantity'
            value={quantity}
          />
          <Button
            type='button'
            variant='outline'
            size='icon'
            onClick={increaseQuantity}
            disabled={quantity >= 10 || isPending}
          >
            <Plus className='h-4 w-4' />
            <span className='sr-only'>Increase quantity</span>
          </Button>
        </div>
      </div>

      <Button type='submit' size='lg' disabled={isPending} className='w-full'>
        {isPending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Adding to Cart...
          </>
        ) : (
          <>
            <ShoppingCart className='mr-2 h-4 w-4' />
            Add to Cart
          </>
        )}
      </Button>
      {formState.errors && formState.errors.title.length > 0 && (
        <div className='text-red-500 text-sm'>{formState.errors.title}</div>
      )}
    </form>
  );
}
