import ProductCard from '@/components/cards/ProductCard';
import { getAllProducts } from '@/lib/data';
import React from 'react';

const dynamic = 'force-dynamic';

async function ShopPage() {
  const products = await getAllProducts();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4 p-4'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ShopPage;
