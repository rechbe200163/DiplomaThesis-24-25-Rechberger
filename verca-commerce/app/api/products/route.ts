
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  
) {
  const search = req.nextUrl.searchParams.get("q");
  const sort = req.nextUrl.searchParams.get("sort");

  // Construct the base query
  let query: any = {
    where: {},
  };

  // Add name search condition if present
  if (search) {
    query.where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  // Add sort condition based on the value of 'sort'
  if (sort === "latest") {
    query.orderBy = {
      createdAt: "desc",
    };
  } else if (sort === "price-asc") {
    query.orderBy = {
      price: "asc",
    };
  } else if (sort === "price-desc") {
    query.orderBy = {
      price: "desc",
    };
  }

  // Execute the query
  const products = await prisma.product.findMany({
    ...query,
    include: {
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(products, { status: 200 });
}
