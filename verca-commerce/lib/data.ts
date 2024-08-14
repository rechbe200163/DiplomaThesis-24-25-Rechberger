import { Product } from "@prisma/client";
import { ProductWithCategoryNames } from "./types";

export async function getAllProducts(): Promise<ProductWithCategoryNames[]> {
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

export async function getProductById(
  productId: string
): Promise<ProductWithCategoryNames> {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
      cache: "no-store",
    });

    const product = await res.json();
    return product;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
}
