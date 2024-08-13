import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { customerId: string } }
) {
  const userId = params.customerId;
  const cart = await prisma.cart.findUnique({
    where: {
      customerId: userId,
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  return NextResponse.json(cart, { status: 200 });
}
