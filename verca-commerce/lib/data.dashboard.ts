'server only';

import { Customer, Product, SiteConfig } from '@prisma/client';
import {
  CartCount,
  CartWithProducts,
  OrderDetails,
  ProductWithCategoryNames,
} from './types';
import { cache } from 'react';
const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getOrdersByCustomer(
  customerReferance: number
): Promise<OrderDetails[]> {
  try {
    const response = await fetch(`${baseApiUrl}/orders/${customerReferance}`, {
      next: { tags: ['orders'] },
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
}
