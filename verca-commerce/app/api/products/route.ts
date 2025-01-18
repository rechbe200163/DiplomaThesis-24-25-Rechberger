import prisma from '@/prisma/client';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const filter = req.nextUrl.searchParams.get('filter') || undefined;
    const query = req.nextUrl.searchParams.get('q') || undefined;
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10', 10);

    // Pagination: Calculate skip and take values
    const skip = (page - 1) * limit;

    console.log('filter:', filter);

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

    // Common filter options
    const baseWhereClause: Prisma.ProductWhereInput = {
      deleted: false,
    };

    if (query !== undefined) {
      baseWhereClause.name = {
        contains: query,
        mode: 'insensitive',
      };
    }

    if (filter !== null) {
      baseWhereClause.categories = {
        some: {
          categoryId: filter,
        },
      };
    }

    console.log('baseWhereClause:', baseWhereClause);

    // Fetch products and total count
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      where: baseWhereClause,
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        categories: {
          select: {
            category: {
              select: {
                categoryId: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const totalProducts = await prisma.product.count({
      where: baseWhereClause,
    });

    const totalPages = Math.ceil(totalProducts / limit);

    console.log('totalPages:', totalPages);
    console.log('totalProducts:', totalProducts);

    return NextResponse.json({ products, totalPages }, { status: 200 });
  } catch (error) {
    // Enhanced error response for debugging
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, stack: error.stack },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
