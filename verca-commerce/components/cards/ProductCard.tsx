import { Product } from '@prisma/client';
import React from 'react';
import Image from 'next/image';
import { ProductWithCategoryNames } from '@/lib/types';
import Link from 'next/link';

const ProductCard = ({ product }: { product: ProductWithCategoryNames }) => {
  const isAddedLast7Days =
    new Date(product.createdAt) >=
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <Link
      href={`/shop/product/${product.id}`}
      className='card bg-base-100 shadow-xl'
    >
      <figure>
        <Image
          src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
          alt='Shoes'
          width={400}
          height={400}
          className='w-full rounded-t-xl'
        />
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
