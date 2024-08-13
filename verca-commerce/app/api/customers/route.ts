import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("q") || "";

  const products = await prisma.customer.findMany({
    where: {
      lastName: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      address: true,
    },
  });

  return NextResponse.json(products, { status: 200 });
}
