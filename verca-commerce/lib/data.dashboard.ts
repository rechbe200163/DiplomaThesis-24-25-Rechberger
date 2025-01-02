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

export async function getSalesStats(): Promise<{
  currentMonthSales: number;
  lastMonthSales: number;
  percentageChange: number;
}> {
  try {
    const response = await fetch(`${baseApiUrl}/invoices?q=salesStats`, {
      next: { tags: ['salesStats'] },
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch sales stats');
  }
}

export async function getCustomerStats(): Promise<{
  currentMonthSignUps: number;
  percentageChange: number;
}> {
  try {
    const response = await fetch(`${baseApiUrl}/customers?q=customerStats`, {
      next: { tags: ['customerStats'] },
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch customer stats');
  }
}

export async function getRevenueStats(): Promise<{
  currentMonthRevenue: number;
  lastMonthRevenue: number;
  percentageChange: number;
}> {
  try {
    const response = await fetch(`${baseApiUrl}/invoices?q=revenueStats`, {
      next: { tags: ['revenueStats'] },
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch revenue stats');
  }
}
