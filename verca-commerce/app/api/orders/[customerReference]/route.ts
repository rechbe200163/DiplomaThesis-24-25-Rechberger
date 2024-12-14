import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ customerReference: string }> }
) {
  const params = await props.params;
  const sort = req.nextUrl.searchParams.get('sort');
  const page = Number(req.nextUrl.searchParams.get('page'));
  const count = req.nextUrl.searchParams.get('count');

  const ORDERS_PER_PAGE = 5;
  try {
    const customerReference = Number(params.customerReference);

    if (!customerReference) {
      return NextResponse.json(
        { error: 'Invalid customer reference' },
        { status: 400 }
      );
    }

    if (count === 'count') {
      const orderCount = await prisma.order.count({
        where: { customerReference, deleted: false },
      });
      return NextResponse.json({ totalOrders: orderCount }, { status: 200 });
    }

    if (page) {
      //calc skip
      const skip = (page - 1) * ORDERS_PER_PAGE;
      // clac take
      const take = ORDERS_PER_PAGE;
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
              product: true, //Produktdetails
            },
          },
          invoice: true, //Rechnungsdetails
        },
      });

      if (!orderDetails.length) {
        return NextResponse.json({ error: 'No orders found' }, { status: 404 });
      }

      return NextResponse.json(orderDetails, { status: 200 });
    } else {
      const orderDetails = await prisma.order.findMany({
        where: { customerReference, deleted: false },
        include: {
          products: {
            include: {
              product: true, //Produktdetails
            },
          },
          invoice: true, //Rechnungsdetails
        },
      });

      if (!orderDetails.length) {
        return NextResponse.json({ error: 'No orders found' }, { status: 404 });
      }

      return NextResponse.json(orderDetails, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
