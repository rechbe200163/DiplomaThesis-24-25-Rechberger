import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  // Execute the query
  const products = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  return NextResponse.json(products, { status: 200 });
}
