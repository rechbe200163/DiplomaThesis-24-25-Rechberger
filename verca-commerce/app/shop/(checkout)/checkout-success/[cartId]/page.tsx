import React from 'react';

async function CheckoutSuccessPage(props: { params: Promise<{ cartId: string }> }) {
  const params = await props.params;
  return (
    <div>
      <h1>Checkout Success</h1>
      <p>Your order has been placed successfully.</p>
      <p>Order ID: {params.cartId}</p>
    </div>
  );
}

export default CheckoutSuccessPage;
