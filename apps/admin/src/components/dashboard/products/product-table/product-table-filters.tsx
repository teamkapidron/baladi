'use client';

import { memo, useState } from 'react';
import { ChevronDown, Search } from '@repo/ui/lib/icons';
import { Input } from '@repo/ui/components/base/input';

function ProductTableFilters() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [goToNextPage, setGoToNextPage] = useState<() => void>(() => {});
  const [goToPreviousPage, setGoToPreviousPage] = useState<() => void>(
    () => {},
  );

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="relative w-full max-w-md sm:w-auto">
        <div className="relative">
          <Search className="text-muted-foreground absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search by name, category, or ID..."
            className="w-full rounded-none pl-9 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Show:</span>
          <select
            className="border-input bg-background h-8 rounded-none border px-2 text-sm"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
            <option value={500}>500</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="border-input bg-background hover:bg-primary flex h-8 w-8 items-center justify-center rounded-none border p-0 hover:text-white"
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
            title="Previous page"
            aria-label="Previous page"
          >
            <ChevronDown className="h-4 w-4 rotate-90" />
          </button>

          {/* Generate page buttons */}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            // Show current page and adjacent pages
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
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`h-8 min-w-8 rounded-none border px-3 ${
                  pageNum === currentPage
                    ? 'bg-primary/5 text-primary border-primary'
                    : 'border-input bg-background hover:bg-primary hover:text-white'
                }`}
                title={`Page ${pageNum}`}
                aria-label={`Page ${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            className="border-input bg-background hover:bg-primary flex h-8 w-8 items-center justify-center rounded-none border p-0 hover:text-white"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={goToNextPage}
            title="Next page"
            aria-label="Next page"
          >
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductTableFilters);