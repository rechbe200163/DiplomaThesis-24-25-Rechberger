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
import CopyToClipboard from '@/components/helpers/CopyOrderId';
import InvoicePdfLink from '@/components/helpers/InvoicePdfLink';
import { OrderState } from '@prisma/client';

function OrderCard({ order }: { order: OrderDetails }) {
  return (
    <Card
      key={order.orderId}
      className='overflow-hidden transition-all hover:shadow-lg '
    >
      <CardHeader className=''>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-wrap items-center gap-4'>
            <div>
              <p className='text-sm font-medium'>Bestell Nummer</p>
              <div className='flex items-center gap-2'>
                <p className='text-lg font-bold min-w-6 text-clip'>
                  {order.orderId}
                </p>
                <CopyToClipboard value={order.orderId} />
              </div>
            </div>
            <Separator orientation='vertical' className='h-10' />
            <div>
              <p className='text-sm font-medium'>Bestellt am</p>
              <p className='text-base'>
                {formatDate(new Date(order.orderDate))}
              </p>
            </div>
            <Separator orientation='vertical' className='h-10' />
            <div>
              <p className='text-sm font-medium'>Artikel</p>
              <p className='text-base'>{order.products.length}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>
                Herunterladen <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <InvoicePdfLink invoicePdfUrl={order.invoice?.pdfUrl!} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className='p-6 '>
        <div className='space-y-4 items-center'>
          {order.products.map((product) => (
            <div
              key={product.product.productId}
              className='flex items-center space-x-4'
            >
              <div className='relative h-24 w-24 overflow-hidden rounded-md flex items-center justify-center'>
                <Suspense fallback={<ImageSkeleton />}>
                  <ImageComponent
                    imagePath={product.product.imagePath!}
                    alt={product.product.name}
                    width={96}
                    height={96}
                    classname='object-cover rounded-md'
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
      <CardFooter className='flex flex-wrap items-center justify-between gap-4 px-6 py-4'>
        <div>
          <p className='text-sm font-medium'>Bestellung Gesamt</p>
          <p className='text-lg font-bold'>
            {formatPrice(Number(order.invoice?.invoiceAmount.toFixed(2)) || 0)}
          </p>
        </div>
        <div>
          <p className='text-sm font-medium'>Zahlstatus</p>
          <Badge
            variant={order.invoice?.paymentDate ? 'default' : 'destructive'}
          >
            {order.invoice?.paymentDate ? 'Bezahlt' : 'Ausstehend'}
          </Badge>
        </div>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='details'>
            <AccordionTrigger>Bestelle Status</AccordionTrigger>
            <AccordionContent>
              <PaymentStatusProgressBar orderState={order.orderState} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}

function PaymentStatusProgressBar({ orderState }: { orderState: OrderState }) {
  const states = [
    'ORDER_PLACED',
    'IN_PROGRESS',
    'DISPATCHED',
    'DELIVERED',
    'ORDER_COLLECTED',
  ];

  return (
    <div className='flex justify-between'>
      {states.map((state, index) => {
        const isComplete = states.indexOf(orderState) >= index;
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
