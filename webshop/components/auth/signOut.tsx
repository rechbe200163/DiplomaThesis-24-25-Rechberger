import { signOut } from '@/auth';
import { LogOut } from 'lucide-react';
import {
  SidebarMenuAction,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/sidebar';

export default function SignOutComponent() {
  return (
    <form
      action={async (formData) => {
        'use server';
        await signOut();
      }}
    >
      <SidebarMenuAction type='submit' className='items-center gap-2'>
        <LogOut className='w-6 h-6' type='submit' />
      </SidebarMenuAction>
    </form>
  );
}
