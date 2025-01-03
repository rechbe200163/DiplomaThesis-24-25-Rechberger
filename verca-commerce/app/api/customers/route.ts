import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q') || '';

    if (query === 'customerStats') {
      const currentMonthSignUps = await prisma.customer.count({
        where: {
          signedUp: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      });

      const lastMontSignUps = await prisma.customer.count({
        where: {
          signedUp: {
            gte: new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 1,
              1
            ),
            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      });

      let percentageChange = 0; // Default value if no meaningful calculation can be made
      if (lastMontSignUps > 0) {
        percentageChange = Math.round(
          ((currentMonthSignUps - lastMontSignUps) / lastMontSignUps) * 100
        );
      } else if (lastMontSignUps === 0 && currentMonthSignUps > 0) {
        percentageChange = 100; // Indicate a complete increase from zero
      }

      return NextResponse.json(
        {
          currentMonthSignUps: currentMonthSignUps,
          percentageChange,
        },
        { status: 200 }
      );
    }

    const products = await prisma.customer.findMany({
      where: {
        lastName: {
          contains: query,
          mode: 'insensitive',
        },
        deleted: false,
      },
      include: {
        address: true,
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
