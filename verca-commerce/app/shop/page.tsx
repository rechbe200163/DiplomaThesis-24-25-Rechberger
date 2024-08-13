import { getAllProducts } from "@/lib/data";
import React from "react";

const dynamic = "force-dynamic";

async function ShopPage() {
  const products = await getAllProducts();
  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </>
  );
}

export default ShopPage;
