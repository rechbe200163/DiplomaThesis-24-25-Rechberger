'use client';
import { useToast } from '@/hooks/use-toast';
import { processImage } from '@/lib/actions/user.actions';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useActionState, useRef } from 'react';

export default function UploadForm() {
  const { toast } = useToast();
  const [formState, action, isPending] = useActionState(processImage, {
    success: false,
    errors: {
      title: [''],
    },
  });

  // // show toast on success
  // if (formState?.success) {
  //   toast({
  //     title: 'Image uploaded successfully',
  //     variant: 'default',
  //   });
  // }

  // // show toast on error
  // if (formState?.errors) {
  //   toast({
  //     title: 'Error uploading image' + formState?.errors.title.join(', '),
  //     variant: 'destructive',
  //   });
  // }

  return (
    <form action={action} className='flex flex-col gap-4'>
      <button
        type='submit'
        disabled={isPending}
        className=' absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer'
      >
        <label>
          <PencilSquareIcon className='w-6 h-6 text-white' />
          <input type='file' name='file' />
        </label>
      </button>
    </form>
  );
}
