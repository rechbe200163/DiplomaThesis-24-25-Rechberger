import CartSummaryCard from "@/components/cards/CartSummaryCard";
import ProductsCartCard from "@/components/cards/ProductsCartCard";
import { getCartByUserId } from "@/lib/data";
import { get } from "http";
import React from "react";

async function CartPage({ params }: { params: { customerId: string } }) {
  const cart = await getCartByUserId(params.customerId);

  return (
    <div className="p-5 md:p-10 space-y-10 bg-gray-50 min-h-screen">
      <div className="text-center md:text-left">
        <span className="text-3xl font-extrabold text-gray-800">
          Shopping Cart
        </span>
        <div className="flex justify-center md:justify-start space-x-2 mt-2">
          <p className="text-lg font-bold text-gray-700">4 items</p>
          <h1 className="text-lg text-gray-600">in your cart.</h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <ProductsCartCard customerId={params.customerId} />
        <CartSummaryCard customerId={params.customerId} />
      </div>
    </div>
  );
}

export default CartPage;
