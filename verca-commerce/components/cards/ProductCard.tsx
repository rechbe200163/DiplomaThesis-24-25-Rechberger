import React, { Suspense } from 'react';
import { ProductWithCategoryNames } from '@/lib/types';
import Link from 'next/link';
import ImageComponent from '../images/ImageComponent';
import { Badge } from '../ui/badge';
import ImageSkeleton from '../images/ImageSkeleton';
import { formatPrice } from '@/lib/utils';

const ProductCard = ({ product }: { product: ProductWithCategoryNames }) => {
  const isAddedLast7Days =
    new Date(product.createdAt) >=
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <Link
      href={`/shop/product/${product.productId}`}
      className='group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1'
    >
      <div className='relative aspect-square'>
        <Suspense fallback={<ImageSkeleton />}>
          <ImageComponent
            imagePath={product.imagePath!}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            classname='transition-transform duration-300 rounded-lg'
          />
        </Suspense>
        {isAddedLast7Days && (
          <Badge className='absolute top-2 right-2'>NEW</Badge>
        )}
      </div>
      <div className='p-3 space-y-2'>
        <h2 className='text-sm font-semibold mb-1 truncate'>{product.name}</h2>
        <p className='text-xs text-gray-600 mb-2 h-8 overflow-hidden'>
          {product.description}
        </p>
        <div className='flex flex-wrap gap-1 mb-2'>
          {product.categories.map((category) => (
            <Badge
              key={category.category.name}
              variant='default'
              className='text-xs'
            >
              {category.category.name}
            </Badge>
          ))}
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm font-bold text-primary'>
            {formatPrice(product.price)}
          </span>
          {product.stock > 0 && product.stock <= 5 ? (
            <Badge variant='outline' className='text-xs'>
              Only {product.stock} left
            </Badge>
          ) : product.stock === 0 ? (
            <Badge variant='outline' className='text-xs'>
              Sold out
            </Badge>
          ) : (
            <Badge variant='outline' className='text-xs'>
              In stock
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
