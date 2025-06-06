'use client';

import { memo } from 'react';
import { CustomerTableHeader } from './customer-table/customer-table-header';
import { CustomerStatusTabs } from './customer-table/customer-status-tabs';
import { CustomerTableFilters } from './customer-table/customer-table-filters';
import { CustomerTableContent } from './customer-table/customer-table-content';

function CustomersTable() {
  const totalRecords = 0;
  const paginationInfo = {
    start: 0,
    end: 0,
    total: 0,
    currentPage: 1,
    totalPages: 1,
  };
  const goToPreviousPage = () => {};
  const goToNextPage = () => {};
  const currentPage = 1;
  const totalPages = 1;

  return (
    <div className="space-y-6">
      <CustomerTableHeader />
      <CustomerStatusTabs />
      <CustomerTableFilters />
      <CustomerTableContent />

      {totalRecords > 0 && (
        <div className="text-muted-foreground flex items-center justify-between px-2 text-sm">
          <div>
            Showing {paginationInfo.start} to {paginationInfo.end} of{' '}
            {paginationInfo.total} customers
          </div>
          <div className="flex items-center gap-2">
            <span>
              Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
            </span>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="border-border hover:bg-muted rounded-sm border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="border-border hover:bg-muted rounded-sm border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(CustomersTable);
