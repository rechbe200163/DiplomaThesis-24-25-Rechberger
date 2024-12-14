import React from 'react';
import { formatDate, formatPrice } from '@/lib/utils';
import Image from 'next/image';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
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
                <Image
                  src={product.product.imagePath || 'https://picsum.photos/80'}
                  width={80}
                  height={80}
                  alt={product.product.name + '-image'}
                  className='object-cover rounded-lg shadow-sm'
                />
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
              Paid on{' '}
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
        <Accordion type='single' collapsible className='w-full items-stretch'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>View Details</AccordionTrigger>
            <AccordionContent>
              <ul className='steps text-gray-700'>
                <li className='step step-info'>Order Placed</li>
                <li className='step step-info'>Order Received</li>
                <li className='step step-info'>Order in Process</li>
                <li className='step step-info'>Shipment in Preparation</li>
                <li className='step step-neutral'>Dispatched</li>
                <li className='step step-neutral'>Delivered</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}

export default OrderCart;
