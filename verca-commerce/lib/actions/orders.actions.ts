'use server';
import { auth } from '@/auth';
import { FormState } from '../form.types';
import prisma from '@/prisma/client';
import { ExtendedProduct } from '../interfaces';
import { createInvoice } from './invoice.actions';

export async function createOrder(
  products: ExtendedProduct[],
  cartId: string
): Promise<FormState> {
  const session = await auth();

  if (!session) {
    return {
      errors: { title: ['You need to be logged in to create an order'] },
      success: false,
    };
  }

  const customerReference = session?.user?.customerReference;

  // Create the order
  const orderItems = products.map((product) => {
    return { productId: product.productId, productAmount: product.quantity };
  });
  console.log(orderItems);
  const order = await prisma.order.create({
    data: {
      customerReference,
      products: {
        create: orderItems,
      },
    },
  });

  createInvoice(order.orderId, products);

  // Create the order items
  return { success: true };
}