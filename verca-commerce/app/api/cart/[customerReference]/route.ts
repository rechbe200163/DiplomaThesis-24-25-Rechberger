import { CartWithProducts } from '@/lib/types';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(
  req: NextRequest,
  props: { params: Promise<{ customerReference: string }> }
) {
  const params = await props.params;
  try {
    const customerReference = Number(params.customerReference);
    const query = req.nextUrl.searchParams.get('q');

    if (query === 'count') {
      const productsCount = await prisma.cart.findUnique({
        where: {
          customerReference: customerReference,
        },
        include: {
          _count: {
            select: {
              products: true,
            },
          },
          products: {
            select: {
              quantity: true,
              productId: true,
            },
          },
        },
      });

      if (!productsCount) {
        return NextResponse.json(
          { message: 'Cart not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(productsCount, { status: 200 });
    }
    const cartProducts = await prisma.cart.findUnique({
      where: {
        customerReference: customerReference,
      },
      include: {
        products: {
          orderBy: {
            product: {
              price: 'desc',
            },
          },

          select: {
            quantity: true,
            product: {
              select: {
                productId: true,
                name: true,
                price: true,
                imagePath: true,
                stock: true,
              },
            },
          },
        },
        _count: {
          select: {
            products: true,
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
