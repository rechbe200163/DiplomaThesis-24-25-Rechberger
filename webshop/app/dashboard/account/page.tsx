import { PasswordForm } from '@/components/forms/dashboard/PasswordForm';
import UpdatUserData from '@/components/helpers/Acoount';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export default function AccountPage() {
  const t = useTranslations('Dashboard.Account');
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold'>{t('title')}</h2>
      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>{t('update_details')}</CardTitle>
            <CardDescription>{t('desc')} </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdatUserData />
            {/* <AccountForm /> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('change_password.title')}</CardTitle>
            <CardDescription>
              {t('change_password.ensure_security')}{' '}
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
