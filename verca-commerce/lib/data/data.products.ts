'server only';

import { ProductWithCategoryNames } from '../types';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getAllProducts(): Promise<ProductWithCategoryNames[]> {
  try {
    const res = await fetch(`${baseApiUrl}/products`, {
      cache: 'no-store',
    });

    const products = await res.json();
    return products;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
}

export async function getFilterdProducts(
  query: string
): Promise<ProductWithCategoryNames[]> {
  try {
    const res = await fetch(`${baseApiUrl}/products?q=${query}`, {
      cache: 'no-store',
    });

    const products = await res.json();
    return products;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
}

export async function getProductById(
  productId: string
): Promise<ProductWithCategoryNames> {
  try {
    const res = await fetch(`${baseApiUrl}/products/${productId}`, {
      cache: 'no-store',
    });

    const product = await res.json();
    return product;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
}
