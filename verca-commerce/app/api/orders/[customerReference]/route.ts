import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ customerReference: string }> }
) {
  const params = await props.params;
  const skip = Number(req.nextUrl.searchParams.get('skip')) | 0;
  const take = Number(req.nextUrl.searchParams.get('take')) | 10;
  const sort = req.nextUrl.searchParams.get('sort');

  console.log(sort);

  try {
    const customerReference = Number(params.customerReference);

    // Detailansicht einer Bestellung
    const orderDetails = await prisma.order.findMany({
      skip,
      take,
      where: { customerReference, deleted: false },
      orderBy: {
        date: sort === 'latest' ? 'desc' : 'asc',
      },
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
