'use client';

import React from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

const CopyOrderId = ({ orderId }: { orderId: string }) => {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='h-6 w-6'
      onClick={() => {
        navigator.clipboard.writeText(orderId);
        toast.success('Order ID copied to clipboard');
      }}
    >
      <Copy className='h-4 w-4' />
      <span className='sr-only'>Copy order ID</span>
    </Button>
  );
};

export default CopyOrderId;
