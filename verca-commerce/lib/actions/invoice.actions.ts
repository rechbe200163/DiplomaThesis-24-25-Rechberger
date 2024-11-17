import { auth } from '@/auth';
import { FormState } from '../form.types';
import { ExtendedProduct } from '../interfaces';
import prisma from '@/prisma/client';

export async function createInvoice(
  orderId: string,
  products: ExtendedProduct[]
): Promise<FormState> {
  const session = await auth();

  if (!session) {
    return {
      errors: { title: ['You need to be logged in to create an invoice'] },
      success: false,
    };
  }

  // Create the invoice
  const invoiceAmount = products.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);
  console.log(invoiceAmount);
  const invoice = await prisma.invoice.create({
    data: {
      orderId,
      invoiceAmount,
    },
  });

  // Create the invoice items
  return { success: true };
}
