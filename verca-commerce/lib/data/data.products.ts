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

export async function getFilteredProducts(
  query: string,
  page: number,
  limit: number,
  filter?: string
): Promise<GetAllProductsResponse> {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (query) {
      params.append('q', query);
    }

    if (filter) {
      params.append('filter', filter);
    }

    // Fetch data from the API
    const res = await fetch(`${baseApiUrl}/products?${params.toString()}`, {
      cache: 'no-store',
    });

    // Destructure products and totalPages from the response
    const {
      products,
      totalPages,
    }: { products: ProductWithCategoryNames[]; totalPages: number } =
      await res.json();

    // Return the response object
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
