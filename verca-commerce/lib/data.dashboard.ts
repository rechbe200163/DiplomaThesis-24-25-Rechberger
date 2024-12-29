'server only';
import { Address } from '@prisma/client';
import { OrderDetails } from './types';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
interface Avatar {
  avatarPath: string;
}

export async function getOrdersByCustomerPagination(
  customerReferance: number,
  page: number = 0
): Promise<OrderDetails[]> {
  try {
    const response = await fetch(
      `${baseApiUrl}/orders/${customerReferance}?page=${page}`,
      {
        next: { tags: ['orders'] },
      }
    );
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
}

export async function getTotalOrders(
  customerReference: number
): Promise<{ totalOrders: number }> {
  try {
    const response = await fetch(
      `${baseApiUrl}/orders/${customerReference}?count=count`,
      {
        next: { tags: ['ordersCount'] },
      }
    );
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch orders count');
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

export async function getCustomerAddress(
  customerReference: number
): Promise<Address> {
  try {
    const response = await fetch(`${baseApiUrl}/address/${customerReference}`, {
      next: { tags: [`address-${customerReference}`] },
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch user address');
  }
}
