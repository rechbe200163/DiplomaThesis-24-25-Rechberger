import { formatDate, formatPrice } from '@/lib/utils';
import { Suspense } from 'react';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ImageComponent from '@/components/images/ImageComponent';
import ImageSkeleton from '@/components/images/ImageSkeleton';
import { orderState } from '@prisma/client';
import CopyOrderId from '@/components/helpers/CopyOrderId';

function OrderCard({ order }: { order: OrderDetails }) {
  return (
    <Card
      key={order.orderId}
      className='overflow-hidden transition-all hover:shadow-lg'
    >
      <CardHeader className='bg-muted'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-wrap items-center gap-4'>
            <div>
              <p className='text-sm font-medium'>Order ID</p>
              <p className='text-lg font-bold'>{order.orderId}</p>
              <CopyOrderId orderId={order.orderId} />
            </div>
            <Separator orientation='vertical' className='h-10' />
            <div>
              <p className='text-sm font-medium'>Ordered On</p>
              <p className='text-base'>{formatDate(new Date(order.date))}</p>
            </div>
            <Separator orientation='vertical' className='h-10' />
            <div>
              <p className='text-sm font-medium'>Total Items</p>
              <p className='text-base'>{order.products.length}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>
                Download <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Download className='mr-2 h-4 w-4' />
                Invoice PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='space-y-4'>
          {order.products.map((product) => (
            <div
              key={product.product.productId}
              className='flex items-center space-x-4'
            >
              <div className='relative h-24 w-24 overflow-hidden rounded-md'>
                <Suspense fallback={<ImageSkeleton />}>
                  <ImageComponent
                    imagePath={product.product.imagePath!}
                    alt={product.product.name}
                    width={96}
                    height={96}
                    classname='object-cover'
                  />
                </Suspense>
              </div>
              <div className='flex-1'>
                <p className='font-semibold'>{product.product.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {product.productAmount} x {formatPrice(product.product.price)}
                </p>
              </div>
              <div className='text-right'>
                <p className='font-semibold'>
                  {formatPrice(product.productAmount * product.product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className='bg-muted flex flex-wrap items-center justify-between gap-4 px-6 py-4'>
        <div>
          <p className='text-sm font-medium'>Order Total</p>
          <p className='text-lg font-bold'>
            {formatPrice(Number(order.invoice?.invoiceAmount.toFixed(2)) || 0)}
          </p>
        </div>
        <div>
          <p className='text-sm font-medium'>Payment Status</p>
          <Badge
            variant={order.invoice?.dateOfPayment ? 'default' : 'destructive'}
          >
            {order.invoice?.dateOfPayment ? 'Paid' : 'Pending'}
          </Badge>
        </div>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='details'>
            <AccordionTrigger>View Order Status</AccordionTrigger>
            <AccordionContent>
              <PaymentStatusProgressBar orderStatus={order.orderStatus} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}

function PaymentStatusProgressBar({
  orderStatus,
}: {
  orderStatus: orderState;
}) {
  const states = [
    'order_placed',
    'order_confirmed',
    'order_shipped',
    'order_delivered',
  ];

  return (
    <div className='flex justify-between'>
      {states.map((state, index) => {
        const isComplete = states.indexOf(orderStatus) >= index;
        return (
          <div key={state} className='flex flex-col items-center'>
            <div
              className={`rounded-full h-3 w-3 ${
                isComplete ? 'bg-primary' : 'bg-muted'
              }`}
            />
            <p className='mt-2 text-xs font-medium'>
              {formatStateLabel(state)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function formatStateLabel(state: string) {
  return state
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default OrderCard;
