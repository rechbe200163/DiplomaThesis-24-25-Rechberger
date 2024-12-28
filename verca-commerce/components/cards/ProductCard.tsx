import React from 'react';
import Image from 'next/image';
import { ProductWithCategoryNames } from '@/lib/types';
import Link from 'next/link';
import ImageComponent from '../images/ImageComponent';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

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
        <ImageComponent
          imagePath={product.imagePath!}
          alt={product.name}
          layout='fill'
          objectFit='cover'
          classname='transition-transform duration-300 rounded-lg'
        />
        {isAddedLast7Days && (
          <Badge className='absolute top-2 right-2'>NEW</Badge>
        )}
      </div>
      <div className='pt-4 px-4 pb-6'>
        <h2 className='text-lg font-semibold mb-2 truncate'>{product.name}</h2>
        <p className='text-sm text-gray-600 mb-3 h-12 overflow-hidden'>
          {product.description}
        </p>
        <div className='flex flex-wrap gap-1 mb-2'>
          {product.categories.map((category) => (
            <Badge key={category.category.name}>{category.category.name}</Badge>
          ))}
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-lg font-bold text-primary'>
            ${product.price.toFixed(2)}
          </span>
          {product.stock > 0 && product.stock <= 5 ? (
            <Badge>Only {product.stock} left</Badge>
          ) : product.stock === 0 ? (
            <Badge>Sold out</Badge>
          ) : (
            <Badge>In stock</Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
