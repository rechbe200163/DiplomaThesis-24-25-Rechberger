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
import { getProductById } from '@/lib/data.shop';

interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}

async function ProductDetailsPage(props: ProductDetailsPageProps) {
  const params = await props.params;
  const product = await getProductById(params.productId);

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <nav className='flex items-center space-x-2 text-sm text-muted-foreground mb-8'>
        <Link href='/shop' className='hover:text-primary transition-colors'>
          Shop
        </Link>
        <ChevronRight className='h-4 w-4' />
        {/* <Link href='#' className='hover:text-primary transition-colors'>
          {product.categories[0].category.name}
        </Link> */}
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
                layout='fill'
                objectFit='cover'
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
              {product.stock > 0 && (
                <Badge
                  variant={product.stock <= 5 ? 'destructive' : 'secondary'}
                >
                  {product.stock <= 5
                    ? `Only ${product.stock} left`
                    : 'In Stock'}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <div className='prose prose-gray max-w-none'>
            <p className='text-base/relaxed'>{product.description}</p>
          </div>

          {/* Add to Cart Section */}
          <div className='space-y-4'>
            <AddToCartForm productId={product.productId} />

            {/* Delivery Info */}
            <Card>
              <CardContent className='grid gap-4 p-6'>
                <div className='flex items-center gap-4'>
                  <Truck className='h-5 w-5 text-muted-foreground' />
                  <div className='text-sm'>
                    <p className='font-medium'>Free Delivery</p>
                    <p className='text-muted-foreground'>2-4 business days</p>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <ShieldCheck className='h-5 w-5 text-muted-foreground' />
                  <div className='text-sm'>
                    <p className='font-medium'>5-Year Warranty</p>
                    <p className='text-muted-foreground'>
                      100% coverage for manufacturing defects
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <Package className='h-5 w-5 text-muted-foreground' />
                  <div className='text-sm'>
                    <p className='font-medium'>Free Returns</p>
                    <p className='text-muted-foreground'>
                      Within 30 days of delivery
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details Accordion */}
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='specifications'>
              <AccordionTrigger>Specifications</AccordionTrigger>
              <AccordionContent>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <p className='font-medium'>{product.description}</p>
                  <p className='text-muted-foreground'>{product.description}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='shipping'>
              <AccordionTrigger>Shipping Information</AccordionTrigger>
              <AccordionContent>
                <div className='space-y-4 text-sm text-muted-foreground'>
                  <p>Free standard shipping on orders over $50</p>
                  <p>Express delivery available (2-3 business days)</p>
                  <p>Local pickup available in select locations</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='returns'>
              <AccordionTrigger>Returns & Warranty</AccordionTrigger>
              <AccordionContent>
                <div className='space-y-4 text-sm text-muted-foreground'>
                  <p>30-day return policy for unused items</p>
                  <p>5-year manufacturer warranty included</p>
                  <p>Free returns on all orders</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Related Products */}
      {/* <div className='mt-16'>
        <h2 className='text-2xl font-bold mb-8'>Related Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Link key={i} href='#' className='group'>
              <div className='relative aspect-square overflow-hidden rounded-lg bg-muted'>
                <Image
                  src='/placeholder.svg?height=400&width=400'
                  alt='Related product'
                  fill
                  className='object-cover transition-transform group-hover:scale-105'
                />
              </div>
              <div className='mt-4'>
                <h3 className='text-sm font-medium'>Related Product {i + 1}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>$299.99</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
        */}
    </div>
  );
}

export default ProductDetailsPage;
