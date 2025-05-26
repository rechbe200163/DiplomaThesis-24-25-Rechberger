import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Package, ShieldCheck, Truck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import AddToCartForm from '@/components/forms/cart/addToCard';
import ImageComponent from '@/components/images/ImageComponent';
import { getProductById } from '@/lib/data/data.products';
import { getTranslations } from 'next-intl/server';

interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}

async function ProductDetailsPage(props: ProductDetailsPageProps) {
  const t = await getTranslations('Shop');
  const params = await props.params;
  const product = await getProductById(params.productId);

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <nav className='flex items-center space-x-2 text-sm text-muted-foreground mb-8'>
        <Link href='/' className='hover:text-primary transition-colors'>
          {t('shop')}
        </Link>
        <ChevronRight className='h-4 w-4' />
        <Link
          href={`/search?filter=${product.categories[0].category.categoryId}`}
          className='hover:text-primary transition-colors'
        >
          {product.categories[0].category.name}
        </Link>
        <ChevronRight className='h-4 w-4' />
        <span className='text-foreground font-medium'>{product.name}</span>
      </nav>

      <div className='grid gap-8 lg:grid-cols-2'>
        {/* Product Image */}
        <div className='space-y-4'>
          <div className='relative aspect-square overflow-hidden rounded-lg border bg-muted'>
            <Suspense
              fallback={
                <div className='w-full h-full animate-pulse bg-muted' />
              }
            >
              <ImageComponent
                imagePath={product.imagePath!}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                classname='object-cover'
              />
            </Suspense>
          </div>
        </div>

        {/* Product Info */}
        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl'>
              {product.name}
            </h1>
            <div className='mt-4 flex items-center space-x-4'>
              <span className='text-3xl font-bold'>
                {formatPrice(product.price)}
              </span>
              {product.stock > 0 ? (
                <Badge variant={product.stock <= 5 ? 'outline' : 'secondary'}>
                  {product.stock <= 5
                    ? `${t('product.only_left')} ${product.stock} ${t('product.remain')}`
                    : `${t('product.available')}`}
                </Badge>
              ) : (
                <Badge variant='destructive'>{t('product.out_of_stock')}</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
