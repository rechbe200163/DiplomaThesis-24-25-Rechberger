import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
    },
  });
  return NextResponse.json(orders, { status: 200 });
}
