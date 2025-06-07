'use client';

// Node Modules
import { memo, useState } from 'react';
import { ChevronDown, Search } from '@repo/ui/lib/icons';

// Components
import { Input } from '@repo/ui/components/base/input';

function CustomerTableFilters() {
  const searchQuery = '';
  const setSearchQuery = (query: string) => {};
  const searchFilter = '';
  const setSearchFilter = (filter: string) => {};
  const pageSize = 10;
  const handlePageSizeChange = (size: number) => {};
  const currentPage = 1;
  const totalPages = 1;
  const goToPage = (page: number) => {};
  const goToNextPage = () => {};
  const goToPreviousPage = () => {};

  // For direct page input
  const [pageInput, setPageInput] = useState<string>(currentPage.toString());

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    if (totalPages > 0) {
      pageNumbers.push(1);
    }

    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('...');
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    // Always show last page if it's not the first page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  // Handle page input change
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  // Handle page input submission
  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      goToPage(page);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  return (
    <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="relative flex w-full max-w-md sm:w-auto">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder={`Search by ${searchFilter}...`}
            className="w-full rounded-none pl-9 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="border-input bg-background h-10 rounded-none border border-l-0 px-2 text-sm"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          aria-label="Search filter"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="userType">User Type</option>
          <option value="address">Address</option>
        </select>
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
          </select>
        </div>

        {totalPages > 0 && (
          <div className="flex items-center gap-1">
            <button
              className="border-input bg-background hover:bg-primary disabled:hover:bg-background disabled:hover:text-foreground flex h-8 w-8 items-center justify-center rounded-none border p-0 hover:text-white disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={goToPreviousPage}
              title="Previous page"
              aria-label="Previous page"
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
            </button>

            {/* Generate page buttons */}
            {pageNumbers.map((pageNum, index) => {
              if (pageNum === '...') {
                return (
                  <span key={`ellipsis-${index}`} className="px-2">
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => goToPage(Number(pageNum))}
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

            {/* Direct page input for large page counts */}
            {totalPages > 5 && (
              <form
                onSubmit={handlePageInputSubmit}
                className="ml-1 flex items-center"
              >
                <input
                  type="text"
                  value={pageInput}
                  onChange={handlePageInputChange}
                  className="border-input bg-background h-8 w-12 rounded-none border px-2 text-center text-sm"
                  aria-label="Go to page"
                  title="Enter page number and press Enter"
                />
                <button
                  type="submit"
                  className="border-input bg-background hover:bg-primary h-8 border border-l-0 px-2 text-xs hover:text-white"
                >
                  Go
                </button>
              </form>
            )}

            <button
              className="border-input bg-background hover:bg-primary disabled:hover:bg-background disabled:hover:text-foreground flex h-8 w-8 items-center justify-center rounded-none border p-0 hover:text-white disabled:opacity-50"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={goToNextPage}
              title="Next page"
              aria-label="Next page"
            >
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(CustomerTableFilters);
