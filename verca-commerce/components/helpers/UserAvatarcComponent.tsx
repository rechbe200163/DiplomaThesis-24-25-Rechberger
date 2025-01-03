import { auth } from '@/auth';
import { fetchUserAvatarPath } from '@/lib/data.dashboard';
import { getSignedURL } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { User2Icon } from 'lucide-react';

export default async function UserAvatar({
  avatarPath,
}: {
  avatarPath: string;
}) {
  const session = await auth();
  const imageURL = await getSignedURL(avatarPath);
  return (
    <>
      <Avatar className='cursor-pointer'>
        <AvatarImage src={imageURL!} />
        <AvatarFallback>
          <User2Icon />
        </AvatarFallback>
      </Avatar>
      <span>{session?.user.email}</span>
    </>
  );
}
