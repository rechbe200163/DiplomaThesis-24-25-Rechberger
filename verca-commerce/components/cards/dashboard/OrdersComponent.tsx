import React from 'react';
import 'daisyui/dist/full.css'; // Import DaisyUI styles

import { OrderDetails } from '@/lib/types';
import OrderCart from './OrderCart';

function Orders({ orders }: { orders: OrderDetails[] }) {
  return (
    <div className='grid grid-row-1 sm:grid-row-2 lg:grid-row-3 gap-6 py-6'>
      {orders.length > 0 ? (
        orders.map((order) => <OrderCart key={order.orderId} order={order} />)
      ) : (
        <div className='col-span-full text-center'>No orders yet</div>
      )}
    </div>
  );
}

export default Orders;
