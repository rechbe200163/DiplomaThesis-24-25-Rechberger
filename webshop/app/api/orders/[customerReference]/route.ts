import prisma from '@/prisma/client';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ customerReference: string }> }
) {
  const params = await props.params;
  const sort = req.nextUrl.searchParams.get('sort');
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10', 10);

  const skip = (page - 1) * limit;

  try {
    const customerReference = Number(params.customerReference);

    if (!customerReference) {
      return NextResponse.json(
        { error: 'Invalid customer reference' },
        { status: 400 }
      );
    }

    if (isNaN(skip) || isNaN(limit)) {
      return NextResponse.json(
        { error: 'Invalid pagination values' },
        { status: 400 }
      );
    }

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: 'Invalid page or limit values' },
        { status: 400 }
      );
    }

    const baseWhereClause: Prisma.OrderWhereInput = {
      deleted: false,
      customerReference,
    };

    const orders = await prisma.order.findMany({
      skip,
      take: limit,
      where: baseWhereClause,
      orderBy: {
        orderDate: sort === 'asc' ? 'asc' : 'desc',
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        invoice: true,
      },
    });

    const totalOrders = await prisma.order.count({
      where: baseWhereClause,
    });

    const totalPages = Math.ceil(totalOrders / limit);

    return NextResponse.json({ orders, totalPages }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
