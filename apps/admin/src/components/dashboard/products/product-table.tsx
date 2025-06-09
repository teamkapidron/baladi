'use client';

// Node Modules
import { memo } from 'react';

// Components
import ProductTableHeader from './product-table/product-table-header';
import ProductTableFilters from './product-table/product-table-filters';
import ProductTableContent from './product-table/product-table-content';

function ProductTable() {
  return (
    <div className="bg-background rounded-xl p-4 shadow-md">
      <ProductTableHeader />
      <ProductTableFilters />
      <ProductTableContent />
    </div>
  );
}

export default memo(ProductTable);
