import React from 'react';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CheckSuccesPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <div className='text-center'>
            <CheckCircle className='mx-auto h-12 w-12 text-green-600' />
            <h1 className='mt-3 text-3xl font-extrabold text-gray-900'>
              Bestellung erfolgreich
            </h1>
            <p className='mt-2 text-sm text-gray-500'>
              Ihre Bestellung wurde erfolgreich aufgegeben.
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
                    Bestelldetails
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6'>
            <Link href='/dashboard' passHref>
              <Button className='w-full flex justify-center items-center'>
                Bestellverlauf anzeigen
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>

          <div className='mt-6 text-center'>
            <Link
              href='/'
              className='text-sm font-medium text-blue-600 hover:text-blue-500'
            >
              Weiter einkaufen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckSuccesPage;
