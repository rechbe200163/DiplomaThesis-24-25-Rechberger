import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const postcode = url.searchParams.get('postcode');

    if (postcode) {
      const addressUsers = await prisma.customer.findMany({
        where: {
          address: {
            postcode: {
              contains: postcode,
              mode: 'insensitive',
            },
          },
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
