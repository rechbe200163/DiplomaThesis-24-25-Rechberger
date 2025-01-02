import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export function DashboardCard({
  title,
  value,
  description,
  icon,
  link,
}: {
  title: string;
  value?: string | number;
  description?: string;
  icon?: React.ReactNode;
  link?: string;
}) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        {description && (
          <p className='text-xs text-muted-foreground'>{description}</p>
        )}
        {link && (
          <p className='text-xs text-muted-foreground'>
            <Link href={link} className='hover:underline'>
              Alle anzeigen
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
