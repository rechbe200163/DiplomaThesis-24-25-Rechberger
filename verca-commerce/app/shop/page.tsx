import { auth } from '@/auth';
import ProductCard from '@/components/cards/ProductCard';
import { getAllProducts } from '@/lib/data.shop';
import React from 'react';

const dynamic = 'force-dynamic';

async function ShopPage() {
  const products = await getAllProducts();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4 p-4'>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))
      ) : (
        <div className='col-span-full text-center'>No products yet</div>
      )}
    </div>
  );
}

export default ShopPage;
