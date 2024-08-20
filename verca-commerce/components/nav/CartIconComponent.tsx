import { auth } from "@/auth";
import { fetchProductsInCart } from "@/lib/data";
import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";

async function CartIconComponent() {
  const session = await auth();

  const productsCount = await fetchProductsInCart(session?.user.id!);

  return (
    <div>
      <Link href={`/shop/${session?.user.id}/cart`}>
        <div className="flex relative">
          <IoCartOutline size={35} />
          {session && productsCount?._count.products > 0 && (
            <div className="badge badge-primary badge-md absolute -top-2  -right-4">
              {productsCount?._count.products}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default CartIconComponent;
