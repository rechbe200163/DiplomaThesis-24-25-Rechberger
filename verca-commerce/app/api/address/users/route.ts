import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const postCode = url.searchParams.get('postCode');

    if (postCode) {
      const addressUsers = await prisma.customer.findMany({
        where: {
          address: {
            postCode: {
              contains: postCode,
              mode: 'insensitive',
            },
          },
          deleted: false,
        },
        include: {
          address: true,
        },
      });

      return NextResponse.json(addressUsers, {
        status: 200,
      });
    }

    const addressUsers = await prisma.customer.findMany({
      where: {
        deleted: false,
      },
      include: {
        address: true,
      },
    });

    return NextResponse.json(addressUsers, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
