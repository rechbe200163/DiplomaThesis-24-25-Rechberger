import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("q");
  const dop = req.nextUrl.searchParams.get("dop");

  if (search === "cu") {
    const customerInvoices = await prisma.invoice.findMany({
      include: {
        order: {
          include: {
            customer: true,
          },
        },
      },
    });
    return NextResponse.json(customerInvoices, {
      status: 200,
    });
  }

  if (search === "paid") {
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

  if (search === "unpaid") {
    const unpaidInvoices = await prisma.invoice.findMany({
      where: {
        dateOfPayment: null!,
      },
    });
    return NextResponse.json(unpaidInvoices, {
      status: 200,
    });
  }

  if (dop === "asc" || dop === "desc") {
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
}
