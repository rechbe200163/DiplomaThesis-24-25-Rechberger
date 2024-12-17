import { generatePdfUrl } from '@/lib/utils';
import { DropdownMenu, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import React from 'react';

async function DownloadPdf({ pdfPath }: { pdfPath: string }) {
  const pdfUrl = await generatePdfUrl(pdfPath);
  return (
    <Link href={pdfUrl} target='_blank' rel='noreferrer'>
      Download PDF
    </Link>
  );
}

export default DownloadPdf;
