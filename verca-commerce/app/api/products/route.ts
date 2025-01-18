import prisma from '@/prisma/client';
import { console } from 'inspector';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get('search');
    const filter = req.nextUrl.searchParams.get('filter') || null;
    const query = req.nextUrl.searchParams.get('q');
    const page = req.nextUrl.searchParams.get('page');
    const limit = req.nextUrl.searchParams.get('limit');

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    if (filter) {
    }

    if (limit && query !== null) {
      const products = await prisma.product.findMany({
        skip: skip,
        take: take,
        where: {
          deleted: false,
          name: {
            contains: query,
            mode: 'insensitive',
          },
          categories: {
            some: {
              categoryId: filter!,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
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
      console.log(products);
      const totalProducts = await prisma.product.count({
        where: {
          deleted: false,
          name: {
            contains: query,
          },
        },
      });

      console.log(products, totalProducts);

      const totalPages = Math.ceil(totalProducts / Number(limit));

      return NextResponse.json({ products, totalPages }, { status: 200 });
    }

    // Add name search condition if present
    if (search) {
      const filterdPoducts = await prisma.product.findMany({
        where: {
          deleted: false,
          name: {
            contains: search,
            mode: 'insensitive',
          },
          categories: {
            some: {
              categoryId: filter!,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
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

    if (limit && page) {
      const products = await prisma.product.findMany({
        skip: skip,
        take: take,
        where: {
          deleted: false,
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

      console.log(products);

      const totalProducts = await prisma.product.count({
        where: {
          deleted: false,
        },
      });

      const totalPages = Math.ceil(totalProducts / Number(limit));

      return NextResponse.json({ products, totalPages }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
