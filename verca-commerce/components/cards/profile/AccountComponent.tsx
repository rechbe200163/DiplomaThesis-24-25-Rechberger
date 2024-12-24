import { auth } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchUser } from '@/lib/data.shop';
import Image from 'next/image';

async function UserDetailsCard() {
  const session = await auth();
  const user = await fetchUser(session?.user.customerReference!);
  return (
    <div className='w-24 h-24 rounded-full overflow-hidden'>
      <Image
        src='/pp.png'
        alt='@shadcn'
        width={100}
        height={100}
        className='w-full h-full'
      />
    </div>
  );
}

export default UserDetailsCard;
