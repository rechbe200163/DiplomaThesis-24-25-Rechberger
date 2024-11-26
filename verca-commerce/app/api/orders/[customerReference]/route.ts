import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ customerReference: string }> }
) {
  const params = await props.params;

  try {
    const customerReference = Number(params.customerReference);

    // Detailansicht einer Bestellung
    const orderDetails = await prisma.order.findMany({
      where: { customerReference, deleted: false },
      include: {
        products: {
          include: {
            product: true, // Produktdetails
          },
        },
        invoice: true, // Rechnungsdetails
      },
    });

    if (!orderDetails) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
