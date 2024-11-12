'use server';

import { auth } from '@/auth';
import prisma from '@/prisma/client';
import { Product } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { ExtendedProduct } from '../interfaces';
import { FormState } from '../form.types';

export async function addToCart(
  productId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return {
        success: false,
        errors: {
          title: ['Please sign in to add products to your cart'],
        },
      };
    }

    const customerId = session.user.id;

    // get product by id to check if it is out of stock

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return {
        success: false,
        errors: {
          title: ['Product not found'],
        },
      };
    }

    if (product?.stock < 1) {
      return {
        success: false,
        errors: {
          title: ['Product out of Stock'],
        },
      };
    }

    // Find the customer's cart or create one if it doesn't exist
    const cart = await prisma.cart.findUnique({
      where: { customerId },
      include: { products: true },
    });

    if (!cart) {
      return {
        success: false,
        errors: {
          title: ['Cart not found'],
        },
      };
    }

    // Check if the product is already in the cart
    const exitingProductCard = await prisma.cartOnProducts.findFirst({
      where: {
        cartId: cart.cartId,
        productId,
      },
    });

    if (exitingProductCard) {
      return {
        success: false,
        errors: {
          title: ['Product already in cart'],
        },
      };
    }

    // Add the product to the cart
    await prisma.cartOnProducts.create({
      data: {
        cartId: cart.cartId,
        productId,
      },
    });

    revalidateTag('cartCount');
    revalidateTag('cart');

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: {
        title: ['Could not add product to cart'],
      },
    };
  }
}

export async function updateQuantity(
  productId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return {
        success: false,
        errors: {
          title: ['Please sign in to update product quantity'],
        },
      };
    }

    const customerId = session.user.id;

    // Find the customer's cart
    const cart = await prisma.cart.findUnique({
      where: { customerId },
      include: { products: true },
    });

    if (!cart) {
      return {
        success: false,
        errors: {
          title: ['Cart not found'],
        },
      };
    }

    // Check if the product is in the cart
    const existingProductCart = await prisma.cartOnProducts.findFirst({
      where: {
        cartId: cart.cartId,
        productId,
      },
    });

    if (!existingProductCart) {
      return {
        success: false,
        errors: {
          title: ['Product not in cart'],
        },
      };
    }

    const value = formData.get('update');

    if (!value || isNaN(parseInt(value as string))) {
      return {
        success: false,
        errors: {
          title: ['Quantity not provided'],
        },
      };
    }

    const product = await prisma.product.findUnique({
      where: { id: productId, deleted: false },
    });

    if (!product) {
      return {
        success: false,
        errors: {
          title: ['Product not found'],
        },
      };
    }

    if (
      parseInt(value as string) + existingProductCart.quantity >
      product?.stock
    ) {
      return {
        success: false,
        errors: {
          title: ['Quantity exceeds stock'],
        },
      };
    }

    // Update the product quantity
    await prisma.cartOnProducts.update({
      where: {
        cartId_productId: {
          cartId: cart.cartId,
          productId,
        },
      },
      data: {
        quantity: existingProductCart.quantity + parseInt(value as string),
      },
    });

    revalidateTag('cartCount');
    revalidateTag('cart');

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: {
        title: ['Could not update product quantity'],
      },
    };
  }
}

export async function removeFromCart(
  productId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error('User not authenticated');
    }

    const customerId = session.user.id;

    // Find the customer's cart
    const cart = await prisma.cart.findUnique({
      where: { customerId },
      include: { products: true },
    });

    if (!cart) {
      return {
        success: false,
        errors: {
          title: ['Cart not found'],
        },
      };
    }

    // Check if the product is in the cart
    const existingProductCart = await prisma.cartOnProducts.findFirst({
      where: {
        cartId: cart.cartId,
        productId,
      },
    });

    if (!existingProductCart) {
      return {
        success: false,
        errors: {
          title: ['Product not in cart'],
        },
      };
    }

    // Remove the product from the cart
    await prisma.cartOnProducts.delete({
      where: {
        cartId_productId: {
          cartId: cart.cartId,
          productId,
        },
      },
    });

    revalidateTag('cartCount');
    revalidateTag('cart');

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: {
        title: ['Could not remove product from cart'],
      },
    };
  }
}

export async function reduceStockofPurchasedProducts(
  products: ExtendedProduct[],
  cartId: string
): Promise<FormState> {
  for (const product of products) {
    const productId = product.id;

    if (!productId) {
      return {
        success: false,
        errors: {
          title: ['Product ID is missing'],
        },
      };
    }

    // Find the existing product in the database
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return {
        success: false,
        errors: {
          title: ['Product not found'],
        },
      };
    }

    if (existingProduct.stock < 1) {
      return {
        success: false,
        errors: {
          title: ['Product out of stock'],
        },
      };
    }

    if (product.quantity > existingProduct.stock) {
      return {
        success: false,
        errors: {
          title: ['Quantity exceeds stock'],
        },
      };
    }

    // Update the product stock
    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: existingProduct.stock - product.quantity,
      },
    });
  }

  clearCart(cartId);

  return {
    success: true,
  };
}

async function clearCart(cartId: string): Promise<FormState> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error('User not authenticated');
    }

    // Remove all products from the cart
    await prisma.cartOnProducts.deleteMany({
      where: {
        cartId: cartId,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: {
        title: ['Could not clear cart'],
      },
    };
  }
}
