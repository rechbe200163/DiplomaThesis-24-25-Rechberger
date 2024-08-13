import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { customerId: string } }
) {
  const sortDate = req.nextUrl.searchParams.get("sort");

  const customerId = params.customerId;
  console.log(customerId);

  if (sortDate) {
    const invoicesUser = await prisma.order.findMany({
      where: {
        customerId: customerId,
      },
      orderBy: {
        deliveryDate: sortDate === "asc" ? "asc" : "desc",
      },
    });
    return NextResponse.json(invoicesUser, { status: 200 });
  }

  const invoicesUser = await prisma.order.findMany({
    where: {
      customerId: customerId,
    },
  });
  return NextResponse.json(invoicesUser, { status: 200 });
}
