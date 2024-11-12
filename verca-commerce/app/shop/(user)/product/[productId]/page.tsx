import React from 'react';
import Image from 'next/image';
import { getProductById } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BiAddToQueue } from 'react-icons/bi';
import AddToCartForm from '@/components/forms/cart/addToCard';

interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}

async function ProductDetailsPage(props: ProductDetailsPageProps) {
  const params = await props.params;
  const product = await getProductById(params.productId);

  return (
    <div className='p-4 md:p-20'>
      <div className='card flex flex-col xl:flex-row w-full shadow-xl'>
        <figure className='flex-none w-full xl:w-1/3'>
          <Image
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
            alt={product.name}
            width={500}
            height={500}
            className='rounded-xl xl:rounded-none object-cover w-full'
          />
          <figcaption className='sr-only'>{product.name}</figcaption>
        </figure>
        <div className='card-body flex-1 p-4 md:p-6'>
          <h2 className='card-title text-2xl md:text-4xl'>{product.name}</h2>
          <p className='hidden md:block mt-4 text-sm md:text-base'>
            {product.description.slice(0, 400)}
          </p>
          <div className='card-actions justify-between mt-4 md:mt-8'>
            <span className='stat-value text-xl md:text-2xl'>
              {formatPrice(product.price)}
            </span>
            <AddToCartForm productId={product.productId} />
          </div>
        </div>
      </div>
      {/* Mobile Accordion for Description */}
      <div className='md:hidden collapse mt-4 shadow-xl from from-gray-200 bg-gradient-to-t hover:bg-gray-300 transition-colors ease-in-out duration-500'>
        <input type='checkbox' />
        <div className='collapse-title text-xl font-medium'>Description</div>
        <div className='collapse-content'>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
