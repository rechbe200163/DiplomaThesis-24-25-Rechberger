import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ productId: string }> }
) {
  const params = await props.params;
  try {
    // Execute the query
    const products = await prisma.product.findUnique({
      where: {
        deleted: false,
        productId: params.productId,
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
