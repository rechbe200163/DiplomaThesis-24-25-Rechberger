import { auth } from '@/auth';
import ProductCard from '@/components/cards/ProductCard';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import { CategoryFilter } from '@/components/search/filters/CategoryFilter';
import { Pagination } from '@/components/ui/pagination';
import { getAllProducts } from '@/lib/data/data.products';

import React from 'react';

async function ShopPage(props: {
  searchParams?: Promise<{
    page?: number;
    limit?: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page || 1;
  const limit = searchParams?.limit || 20;
  const { products, totalPages } = await getAllProducts(page, limit);
  return (
    <>
      <CategoryFilter />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4 p-4'>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <div className=''>
            <p className='text-xl'>No products available at the moment.</p>
            <p className='mt-2'>Please check back later!</p>
          </div>
        )}
      </div>
      <PaginationComponent totalPages={totalPages} />
    </>
  );
}

export default ShopPage;
