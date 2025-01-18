'server only';

import { GetAllProductsResponse, ProductWithCategoryNames } from '../types';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getAllProducts(
  page: number,
  limit: number
): Promise<GetAllProductsResponse> {
  try {
    const res = await fetch(
      `${baseApiUrl}/products?page=${page}&limit=${limit}`,
      {
        cache: 'no-store',
      }
    );

    const {
      products,
      totalPages,
    }: { products: ProductWithCategoryNames[]; totalPages: number } =
      await res.json();
    // Return both products and totalPages as part of an object
    return { products, totalPages };
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
}

export async function getFilterdProducts(
  query: string,
  page: number,
  limit: number,
  filter: string | null
): Promise<GetAllProductsResponse> {
  // Return a single object, not an array
  try {
    const res = await fetch(
      `${baseApiUrl}/products?q=${query}&page=${page}&limit=${limit}&filter=${filter}`,
      {
        cache: 'no-store',
      }
    );

    // Destructure products and totalPages from the response
    const {
      products,
      totalPages,
    }: { products: ProductWithCategoryNames[]; totalPages: number } =
      await res.json();
    // Return both products and totalPages as part of an object
    return { products, totalPages };
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
