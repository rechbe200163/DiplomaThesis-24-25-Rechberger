'use client';
import { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { processImage } from '@/lib/actions/user.actions';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UploadForm() {
  const { toast } = useToast();
  const [formState, action, isPending] = useActionState(processImage, {
    success: false,
    errors: {
      title: [''],
    },
  });

  return (
    <div>
      <form action={action}>
        <Input
          type='file'
          name='file'
          accept='.png, .jpg, .jpeg'
          className='opacity-0'
        />
        <Button>Upload</Button>
      </form>
    </div>
  );
}
