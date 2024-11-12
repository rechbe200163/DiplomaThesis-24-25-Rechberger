import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(
  req: NextRequest,
  props: { params: Promise<{ customerReference: string }> }
) {
  const params = await props.params;
  try {
    const customerReference = params.customerReference;
    const orders = await prisma.order.findMany({
      where: {
        customerReference: customerReference,
      },
      include: {
        customer: true,
      },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
