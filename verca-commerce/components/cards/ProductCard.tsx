import { Product } from '@prisma/client';
import React, { Suspense } from 'react';
import Image from 'next/image';
import { ProductWithCategoryNames } from '@/lib/types';
import Link from 'next/link';
import ImageComponent from '../images/ImageComponent';
import ImageSkeleton from '../images/ImageSkeleton';

const ProductCard = ({ product }: { product: ProductWithCategoryNames }) => {
  const isAddedLast7Days =
    new Date(product.createdAt) >=
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <Link
      href={`/shop/product/${product.productId}`}
      className='card bg-base-100 shadow-xl max-w-[400px] max-h-[400px]'
    >
      <figure className='max-h-fit '>
        <Suspense fallback={<ImageSkeleton />}>
          <ImageComponent
            imagePath={product.imagePath!}
            alt={product.name}
            widht={400}
            height={400}
            classname='w-full'
          />
        </Suspense>
      </figure>
      <div className='card-body rounded-xl text-gray-400 w-full'>
        <h2 className='card-title '>
          {product.name}
          {isAddedLast7Days && <div className='badge badge-secondary'>NEW</div>}
        </h2>
        <p>
          {product.description.length >= 30
            ? product.description.slice(0, 30) + '...'
            : product.description}
        </p>
        <div className='card-actions justify-between items-center'>
          {product.stock > 0 && product.stock <= 5 ? (
            <div className='badge badge-error font-bold'>
              only {product.stock} left
            </div>
          ) : product.stock === 0 ? (
            <div className='badge badge-error font-bold'>Sold out</div>
          ) : null}
          <div>
            {product.categories.map((category) => (
              <div key={category.category.name} className='badge badge-outline'>
                {category.category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
