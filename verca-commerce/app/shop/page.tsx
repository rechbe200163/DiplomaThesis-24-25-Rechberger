import ProductCard from "@/components/cards/ProductCard";
import { getAllProducts } from "@/lib/data";
import React from "react";

const dynamic = "force-dynamic";

async function ShopPage() {
  const products = await getAllProducts();
  return (
    <div className="flex p-10 space-x-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ShopPage;
