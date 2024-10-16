import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const search = req.nextUrl.searchParams.get('q');
    const sort = req.nextUrl.searchParams.get('sort');
    const categoryId = params.categoryId;

    // Construct the base query
    let query: any = {
      where: {},
    };

    // Add name search condition if present
    if (search) {
      query.where.name = {
        contains: search,
        mode: 'insensitive',
      };
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

    if (categoryId) {
      const category = await prisma.product.findMany({
        where: {
          categories: {
            some: {
              categoryId: categoryId,
            },
          },
          deleted: false,
        },
        ...query, // Include the sort condition in the query
      });

      return NextResponse.json(category, { status: 200 });
    }

    // Execute the query
    const products = await prisma.product.findMany(query);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
