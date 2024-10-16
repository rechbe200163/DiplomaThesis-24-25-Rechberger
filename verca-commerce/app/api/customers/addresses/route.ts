import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const city = url.searchParams.get('city');
    const country = url.searchParams.get('country');
    const postcode = url.searchParams.get('postcode');
    const state = url.searchParams.get('state');

    if (city) {
      const addressUsers = await prisma.address.findMany({
        where: {
          city: {
            contains: city,
            mode: 'insensitive',
          },
          deleted: false,
        },
        include: {
          customers: true,
        },
      });
      return NextResponse.json(addressUsers, { status: 200 });
    }
    if (postcode) {
      const addressUsers = await prisma.address.findMany({
        where: {
          postcode: {
            contains: postcode,
            mode: 'insensitive',
          },
          deleted: false,
        },
        include: {
          customers: true,
        },
      });
      return NextResponse.json(addressUsers, { status: 200 });
    }
    if (state) {
      const addressUsers = await prisma.address.findMany({
        where: {
          state: {
            contains: state,
            mode: 'insensitive',
          },
          deleted: false,
        },
        include: {
          customers: true,
        },
      });
      return NextResponse.json(addressUsers, { status: 200 });
    }
    if (country) {
      const addressUsers = await prisma.address.findMany({
        where: {
          country: {
            contains: country,
            mode: 'insensitive',
          },
          deleted: false,
        },
        include: {
          customers: true,
        },
      });
      return NextResponse.json(addressUsers, { status: 200 });
    }

    const addressUsers = await prisma.address.findMany({});

    return NextResponse.json(addressUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
