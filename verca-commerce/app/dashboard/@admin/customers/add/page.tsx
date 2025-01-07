import AddUserForm from '@/components/forms/dashboard/AddUserForm';
import { getAddresses } from '@/lib/data/data.address';

export default async function AddUserPage() {
  const addresses = await getAddresses();

  return <AddUserForm addresses={addresses} />;
}
