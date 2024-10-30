import React from 'react';

function CheckoutSuccessPage({ params }: { params: { cartId: string } }) {
  return (
    <div>
      <h1>Checkout Success</h1>
      <p>Your order has been placed successfully.</p>
      <p>Order ID: {params.cartId}</p>
    </div>
  );
}

export default CheckoutSuccessPage;
