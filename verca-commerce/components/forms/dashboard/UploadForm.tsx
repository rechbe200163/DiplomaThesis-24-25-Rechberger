'use client';
import { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { processImage } from '@/lib/actions/user.actions';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  LucideUpload,
  UploadCloud,
  UploadCloudIcon,
  UploadIcon,
} from 'lucide-react';
import { DialogFooter } from '@/components/ui/dialog';
import { PiUploadSimpleFill } from 'react-icons/pi';

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
      <form action={action} className='flex flex-col space-y-4'>
        <Input
          type='file'
          name='file'
          accept='.png, .jpg, .jpeg'
          className='opacity-100'
        />
        <Button
          disabled={isPending}
          type='submit'
          className='bg-base-200 text-white hover:bg-base-100 w-full'
        >
          {isPending ? (
            <>
              <Loader2 size={20} className='animate-spin' /> &nbsp; Uploading
            </>
          ) : (
            <>
              <LucideUpload className='w-6 h-6' /> &nbsp; Upload Image
            </>
          )}
        </Button>
        {formState.errors?.title && (
          <div className='text-red-500'>{formState.errors.title}</div>
        )}
      </form>
    </div>
  );
}
