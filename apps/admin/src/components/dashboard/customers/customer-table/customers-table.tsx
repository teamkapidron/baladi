'use client';

// Node Modules
import { memo } from 'react';

// Components
import CustomerTableHeader from './customer-table-header';
import CustomerStatusTabs from './customer-status-tabs';
import CustomerTableFilters from './customer-table-filters';
import CustomerTableContent from './customer-table-content';

function CustomersTable() {
  return (
    <div className="space-y-6">
      <CustomerTableHeader />
      <CustomerStatusTabs />
      <CustomerTableFilters />
      <CustomerTableContent />
    </div>
  );
}

export default memo(CustomersTable);
