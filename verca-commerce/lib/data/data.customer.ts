'server only';

import { Customer } from '@prisma/client';

interface Avatar {
  avatarPath: string;
}

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUsersPagination(
  page: number = 0
): Promise<Customer[]> {
  try {
    const response = await fetch(`${baseApiUrl}/customers?page=${page}`, {
      next: { tags: ['customersPaging'] },
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch customers');
  }
}

export async function getTotalUsers(): Promise<{ totalCustomers: number }> {
  try {
    const response = await fetch(`${baseApiUrl}/customers?q=count`, {
      next: { tags: ['customersCount'] },
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch customers count');
  }
}

export async function fetchUserAvatarPath(
  customerReference: number
): Promise<Avatar> {
  try {
    const response = await fetch(
      `${baseApiUrl}/customers/${customerReference}/avatar`,
      {
        next: { tags: ['avatar'] },
      }
    );
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch user avatar');
  }
}

export async function fetchUser(customerReference: number): Promise<Customer> {
  try {
    const res = await fetch(`${baseApiUrl}/customers/${customerReference}`, {
      next: { tags: ['customer'] },
    });

    const user = await res.json();
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
}
