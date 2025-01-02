import { AccountForm } from '@/components/forms/dashboard/AccountForm';
import { PasswordForm } from '@/components/forms/dashboard/PasswordForm';
import UpdatUserData from '@/components/helpers/Acoount';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AccountPage() {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold'>Account Settings</h2>
      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your account details and profile picture.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdatUserData />
            {/* <AccountForm /> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Ensure your account is using a strong password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
