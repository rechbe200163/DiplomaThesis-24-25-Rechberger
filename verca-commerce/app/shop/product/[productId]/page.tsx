import React from "react";
import Image from "next/image";
import { getProductById } from "@/lib/data";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatPrice } from "@/lib/utils";

interface ProductDetailsPageProps {
  params: {
    productId: string;
  };
}

async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const product = await getProductById(params.productId);

  return (
    <div className="p-20">
      <div className="card card-side w-full shadow-xl">
        <figure className="flex-none ">
          <Image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            width={400}
            height={400}
          />
        </figure>
        <div className="card-body ">
          <h1 className="card-title">{product.name}</h1>
          <p>{product.description.slice(0, 500)}</p>

          <div className="card-actions justify-between">
            <span className="stat-value">{formatPrice(product.price)}</span>
            <button className="btn btn-primary ">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
