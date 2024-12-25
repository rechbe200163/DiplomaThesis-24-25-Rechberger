import { auth } from '@/auth';
import { fetchUser } from '@/lib/data.shop';
import UploadForm from '@/components/forms/dashboard/UploadForm';
import ImageComponent from '@/components/images/ImageComponent';

async function UserDetailsCard() {
  const session = await auth();
  const user = await fetchUser(session?.user.customerReference!);
  return (
    <div className='relative w-24 h-24 rounded-full overflow-hidden group'>
      <ImageComponent
        imagePath={user?.avatarPath!}
        alt='User Avatar'
        width={100}
        height={100}
        classname='group-hover:opacity-0 object-fill'
      />
      <UploadForm />
    </div>
  );
}
export default UserDetailsCard;
