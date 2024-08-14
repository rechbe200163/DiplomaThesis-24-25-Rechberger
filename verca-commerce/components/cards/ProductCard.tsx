import { Product } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { ProductWithCategoryNames } from "@/lib/types";

const ProductCard = ({ product }: { product: ProductWithCategoryNames }) => {
  const isAddedLast7Days =
    new Date(product.createdAt) >=
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="card bg-base-100 w-96 shadow-xl ">
      <figure>
        <Image
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          width={400}
          height={400}
        />
      </figure>
      <div className="card-body rounded-xl text-gray-400">
        <h2 className="card-title ">
          {product.name}
          {isAddedLast7Days && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <div className="card-actions justify-end">
            {product.categories.map((category) => (
              <div key={category.category.name} className="badge badge-outline">
                {category.category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
