import { Product } from "@prisma/client";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
    });

    const products = await res.json();
    return products;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}
