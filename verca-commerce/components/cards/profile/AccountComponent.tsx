import { auth } from '@/auth';
import { fetchUser } from '@/lib/data.shop';
import UploadForm from '@/components/forms/dashboard/UploadForm';
import ImageComponent from '@/components/images/ImageComponent';

async function UserDetailsCard() {
  const session = await auth();
  const user = await fetchUser(session?.user.customerReference!);

  return (
    <div className='relative overflow-hidden group'>
      <ImageComponent
        imagePath={user?.avatarPath!}
        alt='User Avatar'
        width={100}
        height={100}
        classname='object-fill'
      />
      <UploadForm />
    </div>
  );
}

export default UserDetailsCard;
