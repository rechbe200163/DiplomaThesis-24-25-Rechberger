import { auth } from '@/auth';
import React from 'react';
import { getOrdersByCustomer } from '@/lib/data.dashboard';
import OrderCard from '@/components/cards/dashboard/OrdersComponent';
import Orders from '@/components/cards/dashboard/OrdersComponent';

async function UserOrdersPage() {
  const session = await auth();
  if (!session) return null;
  const customerReference = session?.user?.customerReference;
  const order = await getOrdersByCustomer(customerReference!);
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        <Orders orders={order} />
      </ul>
    </div>
  );
}

export default UserOrdersPage;
