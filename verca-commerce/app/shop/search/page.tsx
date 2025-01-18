import ProductCard from '@/components/cards/ProductCard';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import { CategoryFilter } from '@/components/search/filters/CategoryFilter';
import { getFilteredProducts } from '@/lib/data/data.products';

export default async function SearchPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: number;
    limit?: number;
    filter?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 20;
  const filter = searchParams?.filter || undefined;

  const { products, totalPages } = await getFilteredProducts(
    query,
    page,
    limit,
    filter
  );
  return (
    <>
      <CategoryFilter />
      <div className='p-4'>
        {products.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4'>
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        ) : (
          <div className='text-center my-10'>
            <p className='text-gray-600 text-lg font-medium'>
              Sorry! it seems we don&apos;t have what you&apos;re looking for.
            </p>
          </div>
        )}
      </div>
      <PaginationComponent totalPages={totalPages} />
    </>
  );
}
