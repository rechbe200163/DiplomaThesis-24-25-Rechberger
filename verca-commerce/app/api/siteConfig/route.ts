import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("q");

  const products = await prisma.siteConfig.findMany({});

  return NextResponse.json(products, { status: 200 });
}
