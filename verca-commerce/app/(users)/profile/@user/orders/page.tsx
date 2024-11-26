import { auth } from '@/auth';
import React from 'react';
import { getOrdersByCustomer } from '@/lib/data.dashboard';

async function UserOrdersPage() {
  const session = await auth();
  if (!session) return null;
  const customerReference = session?.user?.customerReference;
  const order = await getOrdersByCustomer(customerReference!);
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {order.map((order) => (
          <li key={order.orderId}>
            <p>Order ID: {order.orderId}</p>
            <p>Order Date: {order.deliveryDate + ''}</p>
            <p>Order Total: {order.invoice?.invoiceAmount}</p>
            <p>Order Status: {order.invoice?.dateOfPayment + ''}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserOrdersPage;
