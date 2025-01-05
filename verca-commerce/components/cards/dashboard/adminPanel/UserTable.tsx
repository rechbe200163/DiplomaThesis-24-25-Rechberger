import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import UserEmailComponent from '@/components/helpers/UserEmailComponent';
import { Customer } from '@prisma/client';
import DeleteUser from '@/components/forms/panel/DeleteUser';
import RestoreUser from '@/components/forms/panel/RestoreUser';
import { Copy, RotateCcw, Trash2 } from 'lucide-react';
import CopyToClipboard from '@/components/helpers/CopyOrderId';
import { Button } from '@/components/ui/button';
import UserAvatarComponent from '@/components/helpers/UserAvatarComponent';

export function UserTable({ users }: { users: Customer[] }) {
  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
      <Table className='w-full'>
        <TableHeader>
          <TableRow className='bg-gray-50'>
            <TableHead className='w-[80px] py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Avatar
            </TableHead>
            <TableHead className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Name
            </TableHead>
            <TableHead className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Email
            </TableHead>
            <TableHead className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Customer Reference
            </TableHead>
            <TableHead className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Status
            </TableHead>
            <TableHead className='w-[100px] py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.customerReference}
              className='hover:bg-gray-100'
            >
              <TableCell className='py-4 px-4'>
                <UserAvatarComponent avatarPath={user.avatarPath!} />
              </TableCell>
              <TableCell className='py-4 px-4 font-medium text-gray-900'>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell className='py-4 px-4 text-gray-500'>
                {user.email}
              </TableCell>
              <TableCell className='py-4 px-4 text-gray-500'>
                <div className='flex items-center justify-between'>
                  <span>{user.customerReference}</span>
                  <CopyToClipboard value={user.customerReference + ''} />
                </div>
              </TableCell>
              <TableCell className='py-4 px-4'>
                <Badge
                  variant={user.deleted ? 'destructive' : 'default'}
                  className='font-semibold'
                >
                  {user.deleted ? 'Deleted' : 'Active'}
                </Badge>
              </TableCell>
              <TableCell className='py-4 px-4 text-right'>
                <div className='flex justify-end'>
                  {user.deleted ? (
                    <RestoreUser customerReference={user.customerReference} />
                  ) : (
                    <DeleteUser customerReference={user.customerReference} />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
