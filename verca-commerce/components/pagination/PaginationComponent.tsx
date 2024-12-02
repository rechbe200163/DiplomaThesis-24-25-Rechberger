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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

function PaginationComponent({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  // function to set page number as seahr params
  function generateUrl(page: number) {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }

    return `${pathname}?${params.toString()}`;
  }

  return (
    <div>
      <Pagination aria-disabled={totalPages <= 5}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={generateUrl(1)} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href={generateUrl(i + 1)}
                className={cn(
                  pathname.includes(`page=${i + 1}`) && 'bg-gray-200'
                )}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href={generateUrl(totalPages)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
    // <div>
    //   <Pagination aria-disabled={totalPages <= 5}>
    //     <PaginationContent>
    //       <PaginationItem>
    //         <PaginationPrevious href='#' />
    //       </PaginationItem>
    //       {Array.from({ length: totalPages }, (_, i) => (
    //         <PaginationItem key={i}>
    //           <PaginationLink href='#'>{i + 1}</PaginationLink>
    //         </PaginationItem>
    //       ))}
    //       <PaginationItem>
    //         <PaginationNext href='#' />
    //       </PaginationItem>
    //     </PaginationContent>
    //   </Pagination>
    // </div>
  );
}

export default PaginationComponent;
