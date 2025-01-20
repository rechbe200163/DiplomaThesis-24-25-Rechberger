'server only';

import { auth } from '@/auth';
import { CartCount, CartProductDetails, CartWithProducts } from '../types';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function getCartByCustomerReference(
  customerReference: number
): Promise<CartWithProducts> {
  try {
    const res = await fetch(`${baseApiUrl}/cart/${customerReference}`, {
      next: { tags: ['cart'] },
    });

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
    const res = await fetch(`${baseApiUrl}/cart/${customerReference}?q=count`, {
      next: { tags: ['cartCount'] },
    });

    const productsCount = await res.json();
    return productsCount;
  } catch (error) {
    throw new Error('Failed to fetch products count in cart');
  }
}

export async function getProductCartInformationById(
  productId: string
): Promise<CartProductDetails> {
  const session = await auth();
  if (!session) {
    throw new Error('Not authenticated');
  }
  const cr = session.user.customerReference;
  try {
    const res = await fetch(
      `${baseApiUrl}/products/${productId}?q=info&cr=${cr}`,
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
