import React from 'react';
import 'daisyui/dist/full.css'; // Import DaisyUI styles
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Eye } from 'lucide-react';
import { OrderDetails } from '@/lib/types';
import { formatDate, formatPrice } from '@/lib/utils';
import Image from 'next/image';

function OrderCard({ orders }: { orders: OrderDetails[] }) {
  return (
    <div>
      {/* // <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'> */}
      {orders.map((order) => (
        <div key={order.orderId} className='card bg-base-100 shadow-xl'>
          <Card>
            <CardHeader>
              <div className='flex items-center'>
                <span>Order ID: {order.orderId}</span>
                <Separator orientation='vertical' className='mx-2 h-4' />
                <p>{new Date(order.deliveryDate).toLocaleDateString()}</p>
                <Separator orientation='vertical' className='mx-2 h-4' />
                <span>Article in total: {order.products.length}</span>
                <Separator orientation='vertical' className='mx-2 h-4' />
                <span>Ordered on: {formatDate(order.date)}</span>
              </div>
            </CardHeader>
            {/* Product Information */}
            <CardContent>
              <div className='grid grid-cols-1 gap-2'>
                {order.products.map((product) => (
                  <div
                    key={product.product.productId}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center'>
                      <Image
                        src={
                          product.product.imagePath ||
                          'https://picsum.photos/300/300'
                        }
                        width={100}
                        height={100}
                        alt={product.product.name + '-image'}
                        className='object-cover rounded-lg'
                      />
                      <div className='ml-2'>
                        <p className='font-semibold'>{product.product.name}</p>
                        <p className='text-sm'>
                          {product.productAmount} x
                          {formatPrice(product.product.price)}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <span className='font-semibold'>
                        $
                        {(
                          product.productAmount * product.product.price
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardContent>
              <p className='mb-2'>
                <span className='font-semibold'>Order Total:</span> $
                {order.invoice?.invoiceAmount.toFixed(2) || 'N/A'}
              </p>
              <p className='mb-2'>
                <span className='font-semibold'>Status:</span>{' '}
                {order.invoice?.dateOfPayment
                  ? `Paid on ${new Date(
                      order.invoice.dateOfPayment
                    ).toLocaleDateString()}`
                  : 'Pending'}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant='default' className='w-full'>
                View Details
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default OrderCard;
