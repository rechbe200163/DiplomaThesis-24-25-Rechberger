import { auth } from '@/auth';
import { fetchUser } from '@/lib/data.shop';
import UploadForm from '@/components/forms/dashboard/UploadForm';
import ImageComponent from '@/components/images/ImageComponent';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PencilIcon } from 'lucide-react';
import { DialogTitle } from '@radix-ui/react-dialog';

async function UserProfile() {
  const session = await auth();
  const user = await fetchUser(session?.user.customerReference!);

  return (
    <div className='relative flex flex-col rounded-lg w-full items-start'>
      <div className='relative'>
        {/* Dialog container */}
        <Dialog>
          {/* Image serves as the trigger for the dialog */}
          <DialogTrigger asChild>
            <div className='relative cursor-pointer group'>
              {/* User image */}
              <ImageComponent
                imagePath={user?.avatarPath!}
                alt='User Avatar'
                width={400}
                height={400}
                classname='w-48 h-48 rounded-full transition-opacity duration-300 group-hover:opacity-60'
              />
              {/* Pencil icon, shown only on hover */}
              <div className='absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <PencilIcon className='w-8 h-8 text-base-content' />
              </div>
            </div>
          </DialogTrigger>

          {/* Dialog content */}
          <DialogTitle>Choose a new profile picture</DialogTitle>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>Choose a new profile picture</DialogHeader>
            {/* Upload form inside the dialog */}
            <UploadForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default UserProfile;
