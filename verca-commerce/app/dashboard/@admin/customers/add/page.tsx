import AddUserForm from '@/components/forms/dashboard/AddUserForm';
import { getAddresses } from '@/lib/data.dashboard';

export default async function AddUserPage() {
  const addresses = await getAddresses();

  return <AddUserForm addresses={addresses} />;
}
