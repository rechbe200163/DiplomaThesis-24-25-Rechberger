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
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ImageComponent from '@/components/images/ImageComponent';
import ImageSkeleton from '@/components/images/ImageSkeleton';
import CopyToClipboard from '@/components/helpers/CopyOrderId';
import InvoicePdfLink from '@/components/helpers/InvoicePdfLink';
import { OrderState } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { StateProgressBar } from '@/components/helpers/StateProgressBar';

function OrderCard({ order }: { order: OrderDetails }) {
  const t = useTranslations('Orders.order');
  return (
    <Card
      key={order.orderId}
      className='overflow-hidden transition-all hover:shadow-lg'
    >
      <CardHeader className=''>
        <div className='flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4'>
          <div className='flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4'>
            <div>
              <p className='text-sm font-medium'>{t('id')}</p>
              <div className='flex items-center gap-2'>
                <p className='text-base sm:text-lg font-bold min-w-6 text-clip'>
                  {order.orderId}
                </p>
                <CopyToClipboard value={order.orderId} />
              </div>
            </div>
            <Separator
              orientation='vertical'
              className='hidden sm:block h-10'
            />
            <div className='mt-2 sm:mt-0'>
              <p className='text-sm font-medium'>{t('ordered_on')}</p>
              <p className='text-sm sm:text-base'>
                {formatDate(new Date(order.orderDate))}
              </p>
            </div>
            <Separator
              orientation='vertical'
              className='hidden sm:block h-10'
            />
            <div className='mt-2 sm:mt-0'>
              <p className='text-sm font-medium'>{t('articles')}</p>
              <p className='text-sm sm:text-base'>{order.products.length}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='mt-4 sm:mt-0'>
                {t('download_invoice')} <ChevronDown className='ml-2 h-4 w-4' />
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
      <CardContent className='p-4 sm:p-6'>
        <div className='space-y-4 items-center'>
          {order.products.map((product) => (
            <div
              key={product.product.productId}
              className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4'
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
              <div className='text-left sm:text-right w-full sm:w-auto'>
                <p className='font-semibold'>
                  {formatPrice(product.productAmount * product.product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className='flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-4'>
        <div>
          <p className='text-sm font-medium'>{t('total_value')}</p>
          <p className='text-base sm:text-lg font-bold'>
            {formatPrice(Number(order.invoice?.invoiceAmount.toFixed(2)) || 0)}
          </p>
        </div>
        <div className='mt-2 sm:mt-0'>
          <p className='text-sm font-medium'>{t('payment_state')}</p>
          <Badge
            variant={order.invoice?.paymentDate ? 'default' : 'destructive'}
          >
            {order.invoice?.paymentDate
              ? t('payment.success')
              : t('payment.pending')}
          </Badge>
        </div>{' '}
        <Accordion type='single' collapsible className='w-full mt-4 sm:mt-0'>
          <AccordionItem value='details'>
            <AccordionTrigger>{t('state')}</AccordionTrigger>
            <AccordionContent>
              <StateProgressBar
                currentState={order.orderState}
                selfCollect={order.selfCollect}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}

function formatStateLabel(state: string) {
  return state
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default OrderCard;
