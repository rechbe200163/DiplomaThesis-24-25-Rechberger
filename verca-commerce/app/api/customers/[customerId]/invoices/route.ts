import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  const invoicesUser = await prisma.invoice.findMany({
    where: {
      order: {
        customerId: userId,
      },
    },
    orderBy: {
      dateOfPayment: "asc",
    },
  });
  return NextResponse.json(invoicesUser, { status: 200 });
}
