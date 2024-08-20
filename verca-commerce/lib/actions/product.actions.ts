"use server";

import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { revalidateTag } from "next/cache";

type FormState = {
  success: boolean;
  errors?: {
    title: string[];
  };
};

export async function addToCart(
  productId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("User not authenticated");
    }

    const customerId = session.user.id;

    // Find the customer's cart or create one if it doesn't exist
    const cart = await prisma.cart.findUnique({
      where: { customerId },
      include: { products: true },
    });

    if (!cart) {
      return {
        success: false,
        errors: {
          title: ["Cart not found"],
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
          title: ["Product already in cart"],
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

    revalidateTag("cartCount");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: {
        title: ["Could not add product to cart"],
      },
    };
  }
}
