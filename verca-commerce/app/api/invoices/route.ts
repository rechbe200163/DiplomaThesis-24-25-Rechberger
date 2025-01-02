import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get('q');
    const dop = req.nextUrl.searchParams.get('dop');
    const query = req.nextUrl.searchParams.get('q');

    if (query === 'salesStats') {
      const now = new Date();
      const startOfCurrentMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );
      const startOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );

      // Current month's sales count
      const currentMonthSales = await prisma.invoice.count({
        where: {
          deleted: false,
          dateOfPayment: {
            gte: startOfCurrentMonth,
          },
        },
      });

      // Last month's sales count
      const lastMonthSales = await prisma.invoice.count({
        where: {
          deleted: false,
          dateOfPayment: {
            gte: startOfLastMonth,
            lt: startOfCurrentMonth,
          },
        },
      });

      // Calculate percentage change
      const percentageChange =
        lastMonthSales > 0
          ? ((currentMonthSales - lastMonthSales) / lastMonthSales) * 100
          : 0;

      return NextResponse.json(
        {
          currentMonthSales,
          lastMonthSales,
          percentageChange: Math.round(percentageChange),
        },
        { status: 200 }
      );
    }

    if (search === 'cu') {
      const customerInvoices = await prisma.invoice.findMany({
        include: {
          order: {
            include: {
              customer: true,
            },
          },
        },
        where: {
          deleted: false,
        },
      });
      return NextResponse.json(customerInvoices, {
        status: 200,
      });
    }

    if (search === 'paid') {
      const paidInvoices = await prisma.invoice.findMany({
        where: {
          dateOfPayment: {
            not: undefined,
          },
        },
      });
      return NextResponse.json(paidInvoices, {
        status: 200,
      });
    }

    if (search === 'unpaid') {
      const unpaidInvoices = await prisma.invoice.findMany({
        where: {
          dateOfPayment: null!,
        },
      });
      return NextResponse.json(unpaidInvoices, {
        status: 200,
      });
    }

    if (dop === 'asc' || dop === 'desc') {
      const invoices = await prisma.invoice.findMany({
        orderBy: {
          dateOfPayment: dop,
        },
      });
      return NextResponse.json(invoices, {
        status: 200,
      });
    }

    // General invoices query with optional date filter
    const invoices = await prisma.invoice.findMany({});

    return NextResponse.json(invoices, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
