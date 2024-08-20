import { CartWithProducts } from "@/lib/types";
import prisma from "@/prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { customerId: string } }
) {
  const customerId = params.customerId;

  const cartProducts = await prisma.cart.findUnique({
    where: {
      customerId: customerId,
    },
    include: {
      products: {
        orderBy: {
          product: {
            price: "desc",
          },
        },
        select: {
          product: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });

  if (!cartProducts) {
    return NextResponse.json({ message: "Cart not found" }, { status: 404 });
  }

  return NextResponse.json(cartProducts, { status: 200 });
}
