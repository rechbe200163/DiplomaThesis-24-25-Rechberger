import React from 'react';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function CheckoutSuccessPage({ params }: { params: { cartId: string } }) {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <div className='text-center'>
            <CheckCircle className='mx-auto h-12 w-12 text-green-600' />
            <h1 className='mt-3 text-3xl font-extrabold text-gray-900'>
              Checkout Success
            </h1>
            <p className='mt-2 text-sm text-gray-500'>
              Your order has been placed successfully.
            </p>
          </div>

          <div className='mt-6'>
            <div className='rounded-md bg-green-50 p-4'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <ShoppingBag
                    className='h-5 w-5 text-green-400'
                    aria-hidden='true'
                  />
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-green-800'>
                    Order Details
                  </h3>
                  <div className='mt-2 text-sm text-green-700'>
                    <p>Order ID: {params.cartId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6'>
            <Link href='/dashboard' passHref>
              <Button className='w-full flex justify-center items-center'>
                View Order History
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>

          <div className='mt-6 text-center'>
            <Link
              href='/shop'
              className='text-sm font-medium text-blue-600 hover:text-blue-500'
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccessPage;
