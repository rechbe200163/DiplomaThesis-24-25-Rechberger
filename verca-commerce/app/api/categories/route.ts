import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const products = await prisma.category.findMany({});

  return NextResponse.json(products, { status: 200 });
}
