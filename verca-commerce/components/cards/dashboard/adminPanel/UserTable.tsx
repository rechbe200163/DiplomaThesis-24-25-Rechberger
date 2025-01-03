import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import UserAvatar from '@/components/helpers/UserAvatarcComponent';
import { Customer } from '@prisma/client';
import DeleteUser from '@/components/forms/panel/DeleteUser';
import RestoreUser from '@/components/forms/panel/RestoreUser';

export function UserTable({ users }: { users: Customer[] }) {
  return (
    <Table className='w-full'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Avatar</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Customer Reference</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className='w-[100px] text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.customerReference}>
            <TableCell>
              <UserAvatar avatarPath={user.avatarPath!} />
            </TableCell>
            <TableCell className='font-medium'>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.customerReference}</TableCell>
            <TableCell>
              <Badge variant={user.deleted ? 'destructive' : 'default'}>
                {user.deleted ? 'Deleted' : 'Active'}
              </Badge>
            </TableCell>
            <TableCell className='text-right flex'>
              <DeleteUser customerReference={user.customerReference} />
              <RestoreUser customerReference={user.customerReference} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
