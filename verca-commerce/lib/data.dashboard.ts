'server only';
import { OrderDetails } from './types';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

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
