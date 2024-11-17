import { Customer, Product, SiteConfig } from '@prisma/client';
import { CartCount, CartWithProducts, ProductWithCategoryNames } from './types';
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

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(`${baseApiUrl}/siteConfig`, {
      next: { tags: ['siteConfig'] },
    });

    const siteConfig = await res.json();
    return siteConfig;
  } catch (error) {
    throw new Error('Failed to fetch site config');
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

export async function getOrdersByUserId(customerReference: string) {
  try {
    const res = await fetch(
      `https://localhost:3000/api/orders?customerReference=${customerReference}`,
      {
        cache: 'no-store',
      }
    );

    const orders = await res.json();
    return orders;
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
}

export async function getCartByCustomerReference(
  customerReference: number
): Promise<CartWithProducts> {
  try {
    const res = await fetch(
      `https://localhost:3000/api/cart/${customerReference}`,
      {
        next: { tags: ['cart'] },
      }
    );

    const cart = await res.json();

    return cart;
  } catch (error) {
    throw new Error('Failed to fetch cart');
  }
}

export async function fetchProductsInCart(
  customerReference: number
): Promise<CartCount> {
  try {
    const res = await fetch(
      `https://localhost:3000/api/cart/${customerReference}?q=count`,
      {
        next: { tags: ['cartCount'] },
      }
    );

    const productsCount = await res.json();
    return productsCount;
  } catch (error) {
    throw new Error('Failed to fetch products count in cart');
  }
}

export async function fetchUser(customerReference: number): Promise<Customer> {
  try {
    const res = await fetch(
      `https://localhost:3000/api/customers/${customerReference}`,
      {
        next: { tags: ['user'] },
      }
    );

    const user = await res.json();
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
}
