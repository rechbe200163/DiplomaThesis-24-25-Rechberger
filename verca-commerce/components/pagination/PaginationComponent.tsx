'use client';

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const PaginationComponent = ({ totalPages }: { totalPages: number }) => {
  const t = useTranslations('Pagination');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function generateUrl(page: number) {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete('page');
    } else if (page > totalPages) {
      if (totalPages === 1) {
        params.delete('page');
      } else {
        params.set('page', totalPages.toString());
      }
    } else if (page < 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }

    return `${pathname}?${params.toString()}`;
  }

  function getActivePage() {
    const params = new URLSearchParams(searchParams);
    const page = params.get('page');

    return page ? parseInt(page) : 1;
  }

  return (
    <div>
      <Pagination aria-disabled={totalPages <= 5}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={generateUrl(getActivePage() - 1)} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href={generateUrl(i + 1)}
                isActive={getActivePage() === i + 1 || getActivePage() === null}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href={generateUrl(getActivePage() + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
