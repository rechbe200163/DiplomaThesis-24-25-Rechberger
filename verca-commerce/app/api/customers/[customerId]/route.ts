import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { customerId }: { customerId: string }
) {
  const user = await prisma.customer.findUnique({
    where: {
      customerId: customerId,
    },
  });

  return NextResponse.json(user, { status: 200 });
}
