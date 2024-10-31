import { CartWithProducts } from '@/lib/types';
import prisma from '@/prisma/client';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(
  req: NextRequest,
  props: { params: Promise<{ customerId: string }> }
) {
  const params = await props.params;
  try {
    const customerId = params.customerId;

    const cartProducts = await prisma.cart.findUnique({
      where: {
        customerId: customerId,
      },
      include: {
        products: {
          orderBy: {
            product: {
              price: 'desc',
            },
          },
          select: {
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!cartProducts) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    return NextResponse.json(cartProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
