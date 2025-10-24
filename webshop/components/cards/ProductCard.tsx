import React, { Suspense } from 'react';
import { ProductWithCategoryNames } from '@/lib/types';
import Link from 'next/link';
import ImageComponent from '../images/ImageComponent';
import { Badge } from '../ui/badge';
import ImageSkeleton from '../images/ImageSkeleton';
import { formatPrice } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

const ProductCard = ({ product }: { product: ProductWithCategoryNames }) => {
  const t = useTranslations('Shop.product');
  const isAddedLast7Days =
    new Date(product.createdAt) >=
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <Link
      href={`/product/${product.productId}`}
      className='group flex flex-col h-full'
    >
      <div className='relative aspect-square w-full bg-[#f5f5f5] rounded-lg overflow-hidden'>
        <Suspense fallback={<ImageSkeleton />}>
          <ImageComponent
            imagePath={product.imagePath!}
            alt={product.name}
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
          />
        </Suspense>
        {isAddedLast7Days && (
          <Badge className='absolute top-2 right-2 z-10' variant='secondary'>
            {t('product_new').toUpperCase()}
          </Badge>
        )}
      </div>
      <div className='mt-3 space-y-1 flex-1'>
        <div className='flex gap-2 items-start flex-wrap'>
          {product.categories.map((category) => (
            <Badge
              key={category.category.name}
              variant='secondary'
              className='text-xs'
            >
              {category.category.name}
            </Badge>
          ))}
        </div>
        <h2 className='text-lg font-medium line-clamp-1'>{product.name}</h2>
        <p className='text-sm text-muted-foreground line-clamp-2'>
          {product.description}
        </p>
        <div className='flex items-center justify-between pt-1'>
          <span className='text-lg font-medium'>
            {formatPrice(product.price)}
          </span>
          {product.stock > 0 && product.stock <= 5 ? (
            <Badge variant={'outline'}>
              {t('only_left')} {product.stock} {t('remain')}
            </Badge>
          ) : product.stock === 0 ? (
            <Badge variant={'outline'}>{t('out_of_stock')}</Badge>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
