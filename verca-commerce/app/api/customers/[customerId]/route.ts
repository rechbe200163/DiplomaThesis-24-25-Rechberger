import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { customerId: string } }
) {
  const customerId = params.customerId;

  const user = await prisma.customer.findUnique({
    where: {
      customerId: customerId,
    },
    include: {
      address: true,
    },
  });

  return NextResponse.json(user, { status: 200 });
}
