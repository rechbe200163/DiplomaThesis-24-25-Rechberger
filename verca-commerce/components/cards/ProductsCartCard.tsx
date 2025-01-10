import React, { Suspense } from 'react';
import RemoveFromCart from '../forms/cart/removeFromCart';
import { cn, formatPrice } from '@/lib/utils';
import ImageComponent from '../images/ImageComponent';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { CartWithProducts } from '@/lib/types';
import { ProductCartQuantity } from '../helpers/ProductCartQuantity';
import ImageSkeleton from '../images/ImageSkeleton';

function ProductsCartCard({ cart }: { cart: CartWithProducts }) {
  return (
    <ScrollArea className='h-[calc(100vh-12rem)] overflow-y-auto flex-1'>
      <div className='space-y-4 pr-4'>
        {cart.products.map((item) => (
          <Card
            key={item.product.productId}
            aria-disabled={item.product.stock === 0}
            className={cn(
              'overflow-hidden transition-all duration-200 hover:shadow-lg',
              {
                'bg-gray-50': item.product.stock === 0,
              }
            )}
          >
            <CardContent className='p-0'>
              <div className='flex flex-col sm:flex-row'>
                <div className='relative w-full sm:w-48 aspect-square sm:aspect-[4/3]'>
                  <Suspense fallback={<ImageSkeleton />}>
                    <ImageComponent
                      imagePath={item.product.imagePath!}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes='(max-width: 640px) 100vw, 33vw'
                    />
                  </Suspense>
                </div>
                <div className='flex flex-col justify-between p-6 w-full'>
                  <div className='space-y-3'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h3 className='text-lg font-semibold leading-none tracking-tight'>
                          {item.product.name}
                        </h3>
                        <p className='text-sm text-muted-foreground mt-2'>
                          {item.product.description}
                        </p>
                      </div>
                      <RemoveFromCart productId={item.product.productId} />
                    </div>
                    <div className='flex items-center gap-2'>
                      {item.product.stock === 0 ? (
                        <Badge variant='destructive' className='text-xs'>
                          Out of Stock
                        </Badge>
                      ) : item.product.stock <= 5 ? (
                        <Badge variant='destructive' className='text-xs'>
                          Only {item.product.stock} left
                        </Badge>
                      ) : (
                        <Badge variant='secondary' className='text-xs'>
                          In Stock
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center justify-between mt-4 pt-4 border-t'>
                    <div className='flex items-center gap-4'>
                      <Suspense fallback={<div>Loading...</div>}>
                        <ProductCartQuantity
                          productId={item.product.productId}
                        />
                      </Suspense>
                      <div className='text-sm text-muted-foreground'>
                        × {formatPrice(item.product.price)}
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <span className='text-lg font-semibold'>
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}

export default ProductsCartCard;
