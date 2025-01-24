import { getInvoicePdfUrl } from '@/lib/utils';
import { Download } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';

export default async function InvoicePdfLink({
  invoicePdfUrl,
}: {
  invoicePdfUrl: string;
}) {
  const t = await getTranslations('Orders.order');
  const pdfUrl = await getInvoicePdfUrl(invoicePdfUrl);
  return (
    <>
      <Download className='mr-2 h-4 w-4' />
      <Link href={pdfUrl}> {t('invoice_pdf')}</Link>
    </>
  );
}
