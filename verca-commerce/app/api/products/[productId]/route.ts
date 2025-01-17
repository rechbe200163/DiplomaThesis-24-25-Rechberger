import { Product } from '@prisma/client';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ productId: string }> }
) {
  const params = await props.params;
  const customerReference = req.nextUrl.searchParams.get('cr');
  const query = req.nextUrl.searchParams.get('q');

  try {
    // Execute the query

    if (query === 'info') {
      // get cart product is in
      const cart = await prisma.cart.findFirst({
        where: {
          customerReference: Number(customerReference),
        },
        select: {
          products: {
            where: {
              productId: params.productId,
            },
            select: {
              quantity: true,
              productId: true,
              product: {
                select: {
                  stock: true,
                },
              },
            },
          },
        },
      });

      if (!cart) {
        return NextResponse.json(
          { message: 'Cart not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(cart.products[0], { status: 200 });
    }

    const products = await prisma.product.findUnique({
      where: {
        deleted: false,
        productId: params.productId,
      },
      include: {
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log('Error Info', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

function calcSkipTakeAndPageNumber(
  page: number,
  limit: number,
  totalItems: number
): { skip: number; take: number; totalPages: number } {
  const skip = page * limit;
  const take = limit;

  const totalPages = Math.ceil(totalItems / limit);

  return { skip, take, totalPages };
}
