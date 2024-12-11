import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get('q');
    const category = req.nextUrl.searchParams.get('category');
    const sort = req.nextUrl.searchParams.get('sort');

    // Construct the base query
    let query: any = {
      where: {},
    };

    // Add name search condition if present
    if (search) {
      const filterdPoducts = await prisma.product.findMany({
        where: {
          deleted: false,
          name: {
            contains: search,
            mode: 'insensitive',
          },
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
      if (filterdPoducts.length === 0) {
        return NextResponse.json(
          { error: 'No products found' },
          { status: 404 }
        );
      }
      return NextResponse.json(filterdPoducts, { status: 200 });
    }

    // Add sort condition based on the value of 'sort'
    if (sort === 'latest') {
      query.orderBy = {
        createdAt: 'desc',
      };
    } else if (sort === 'price-asc') {
      query.orderBy = {
        price: 'asc',
      };
    } else if (sort === 'price-desc') {
      query.orderBy = {
        price: 'desc',
      };
    }

    const sortedProducts = await prisma.product.findMany({
      where: {
        deleted: false,
      },
      ...query,
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

    // Execute the query

    return NextResponse.json(sortedProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
