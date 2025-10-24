import { auth } from '@/auth';
import { getSignedURL } from '@/lib/utils';
import { User2Icon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default async function UserAvatarComponent({
  avatarPath,
}: {
  avatarPath: string;
}) {
  const session = await auth();
  const imageURL = await getSignedURL(avatarPath);
  return (
    <Avatar>
      <AvatarImage src={imageURL!} className='w-10 h-10 rounded-full' />
      <AvatarFallback>
        <User2Icon />
      </AvatarFallback>
    </Avatar>
  );
}
