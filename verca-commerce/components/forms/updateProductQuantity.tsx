'use client';

import { useFormState } from 'react-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '../ui/select';
import { SelectTrigger } from '@radix-ui/react-select';
import { updateQuantity } from '@/lib/actions/product.actions';
import { useRef } from 'react';

function UpadateProductQuantity({ productId }: { productId: string }) {
  console.log('ProductId from removeFromCart Form', productId);
  const upadateProductQuantity = updateQuantity.bind(null, productId);
  const [formState, action] = useFormState(upadateProductQuantity, {
    success: false,
    errors: {
      title: [''],
    },
  });

  function handleSubmit(value: string) {}

  // Submit the form when the value is changed

  return (
    <form action={action} className='flex items-center'>
      <Select name='quantity' defaultValue='1' onValueChange={handleSubmit}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Product Quantity' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Quantity</SelectLabel>
            {Array.from({ length: 10 }).map((_, i) => (
              <SelectItem key={i} value={`${i + 1}`}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {formState?.errors && (
        <div className='text-red-500 text-sm mt-2'>
          {formState?.errors.title.join(', ')}
        </div>
      )}
    </form>
  );
}

export default UpadateProductQuantity;
