'server only';

import { CartCount, CartWithProducts } from '../types';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
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
