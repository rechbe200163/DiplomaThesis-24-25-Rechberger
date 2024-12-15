import React, { Suspense } from 'react';
import { formatDate, formatPrice } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OrderDetails } from '@/lib/types';
import ImageComponent from '@/components/images/ImageComponent';
import ImageSkeleton from '@/components/images/ImageSkeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { orderState } from '@prisma/client';
import Link from 'next/link';

function OrderCart({ order }: { order: OrderDetails }) {
  return (
    <Card
      key={order.orderId}
      className='shadow-lg transition-transform transform duration-200 border border-gray-300'
    >
      <CardHeader className='flex-row items-center justify-between'>
        <div className='flex items-center flex-wrap gap-4 text-gray-700 text-sm'>
          <span className='font-bold'>Order ID:</span>
          <span>{order.orderId}</span>
          <Separator orientation='vertical' className='h-4' />
          <span>
            <strong>Delivery Date:</strong> {formatDate(order.deliveryDate)}
          </span>
          <Separator orientation='vertical' className='h-4' />
          <span>
            <strong>Total Items:</strong> {order.products.length}
          </span>
          <Separator orientation='vertical' className='h-4' />
          <span>
            <strong>Ordered On:</strong> {formatDate(order.date)}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>Invoice</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`${order.invoice?.pdfUrl}`}>Download Invoice</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      {/* Product Information */}
      <CardContent>
        <div className='grid grid-cols-1 gap-4'>
          {order.products.map((product) => (
            <div
              key={product.product.productId}
              className='flex items-center justify-between p-2 rounded-lg'
            >
              <div className='flex items-center gap-4'>
                <Suspense fallback={<ImageSkeleton />}>
                  <ImageComponent
                    imagePath={product.product.imagePath!}
                    alt={product.product.name}
                    width={96}
                    height={96}
                    classname='w-full rounded-xl'
                  />
                </Suspense>
                <div>
                  <p className='font-semibold text-gray-800'>
                    {product.product.name}
                  </p>
                  <p className='text-sm text-gray-600'>
                    {product.productAmount} x{' '}
                    {formatPrice(product.product.price)}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <span className='font-semibold text-gray-800'>
                  {formatPrice(product.productAmount * product.product.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardContent>
        <p className='mb-2 text-gray-700'>
          <span className='font-semibold'>Order Total: </span>
          {formatPrice(Number(order.invoice?.invoiceAmount.toFixed(2))) ||
            'N/A'}
        </p>
        <p className='mb-2 text-gray-700'>
          <span className='font-semibold'>Status: </span>
          {order.invoice?.dateOfPayment ? (
            <>
              Paid on
              <span className='text-green-600 font-medium'>
                {new Date(order.invoice.dateOfPayment).toLocaleDateString()}
              </span>
            </>
          ) : (
            <span className='text-red-600'>Pending</span>
          )}
        </p>
      </CardContent>
      <CardFooter className='bg-gray-50 rounded-b-lg'>
        <Accordion
          type='single'
          collapsible
          className='w-full items-stretch justify-stretch'
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger>View Details</AccordionTrigger>
            <AccordionContent>
              {/*Order Status*/}
              {PaymentStatusProgressBar(order.orderStatus)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}

export default OrderCart;

function PaymentStatusProgressBar(orderStatus: orderState) {
  // Extract enum keys dynamically
  const states = Object.keys(orderState) as Array<keyof typeof orderState>;

  return (
    <ul className='steps steps-vertical md:steps-horizontal w-full'>
      {states.map((state, index) => {
        // Determine if the current state or any predecessors should be marked as complete
        const isComplete = states.indexOf(orderStatus) >= index;

        return (
          <li
            key={state}
            className={`step ${isComplete ? 'step-neutral' : ''}`}
          >
            {formatStateLabel(state)}
          </li>
        );
      })}
    </ul>
  );
}

function formatStateLabel(state: string) {
  return state
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}
