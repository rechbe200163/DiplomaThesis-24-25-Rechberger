import { getCartByUserId } from "@/lib/data";
import Image from "next/image";
import React from "react";
import RemoveFromCart from "../forms/removeFromCart";

async function ProductsCartCard({ customerId }: { customerId: string }) {
  const products = await getCartByUserId(customerId);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-0 w-full md:w-2/3 overflow-auto">
      {products.products.map((product) => (
        <div
          key={product.product.name}
          className="card card-side shadow-xl rounded-lg overflow-hidden bg-white"
        >
          <figure className="w-1/3">
            <Image
              src={
                product.product.imagePath ||
                "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              }
              alt="Movie"
              className="object-cover w-full h-full"
              width={400}
              height={400}
            />
          </figure>
          <div className="card-body flex flex-col gap-4 p-4 w-2/3">
            <div className="text-lg font-semibold text-gray-800">
              {product.product.name}
            </div>
            <div className="badge badge-outline text-gray-600">
              {product.product.stock}
            </div>
            <div className="text-gray-600">Quantity: 1</div>
            <div className="flex items-center justify-between mt-auto">
              <select className="badge badge-ghost badge-lg" defaultValue={1}>
                {Array(11)
                  .fill(null)
                  .map((_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
              </select>
              <RemoveFromCart productId={product.product.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsCartCard;
