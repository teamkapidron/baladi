'use client';

// Node Modules
import { memo } from 'react';

// Components
import { Skeleton } from '@repo/ui/components/base/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@repo/ui/components/base/pagination';
import ProductCard from '@/components/product/product-card';

// Hooks
import { useProducts } from '@/hooks/useProduct';
import { usePagination } from '@repo/ui/hooks/usePagination';

function ProductGrid() {
  const {
    goToNextPage,
    goToPreviousPage,
    handlePageChange: goToPage,
  } = usePagination();
  const { data: productsData, isLoading } = useProducts();

  if (isLoading) {
    return <ProductLoadingSkeleton />;
  }

  if (!productsData?.products || productsData.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4 rounded-lg bg-[var(--baladi-light)] p-8 text-center">
          <h3 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Ingen produkter funnet
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Prøv å justere filtrene dine eller søk etter noe annet.
          </p>
        </div>
      </div>
    );
  }

  const { products, totalPages, currentPage } = productsData;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={goToPreviousPage}
                    className="cursor-pointer font-[family-name:var(--font-dm-sans)] hover:bg-[var(--baladi-light)] hover:text-[var(--baladi-primary)]"
                  />
                </PaginationItem>
              )}

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => goToPage(pageNum)}
                      isActive={pageNum === currentPage}
                      className={`cursor-pointer font-[family-name:var(--font-dm-sans)] ${
                        pageNum === currentPage
                          ? 'bg-[var(--baladi-primary)] text-white hover:bg-[var(--baladi-primary)]'
                          : 'hover:bg-[var(--baladi-light)] hover:text-[var(--baladi-primary)]'
                      }`}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    onClick={goToNextPage}
                    className="cursor-pointer font-[family-name:var(--font-dm-sans)] hover:bg-[var(--baladi-light)] hover:text-[var(--baladi-primary)]"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default memo(ProductGrid);

const ProductLoadingSkeleton = memo(() => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-[var(--baladi-border)] bg-white p-4"
        >
          <Skeleton className="mb-4 aspect-square w-full rounded-md" />
          <Skeleton className="mb-2 h-4 w-3/4" />
          <Skeleton className="mb-2 h-4 w-1/2" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  );
});
