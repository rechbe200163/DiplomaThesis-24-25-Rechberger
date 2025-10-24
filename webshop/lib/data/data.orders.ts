'server only';

import { GetAllOrdersResponse, OrderDetails } from '../types';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getOrdersByCustomerPagination(
  customerReferance: number,
  page: number,
  limit: number
): Promise<GetAllOrdersResponse> {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const res = await fetch(
      `${baseApiUrl}/orders/${customerReferance}?${params.toString()}`,
      {
        next: { tags: ['orders'] },
      }
    );
    const {
      orders,
      totalPages,
    }: { orders: OrderDetails[]; totalPages: number } = await res.json();

    return { orders, totalPages };
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

export async function getOrdersByUserId(customerReference: string) {
  try {
    const res = await fetch(
      `${baseApiUrl}/orders?customerReference=${customerReference}`,
      {
        cache: 'no-store',
      }
    );

    const orders = await res.json();
    return orders;
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
}
