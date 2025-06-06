'use client';

import React, { memo, useState } from 'react';
import { ProductTableFilters } from './product-table/product-table-filters';
import { ProductTableHeader } from './product-table/product-table-header';
import { ProductStatusTabs } from './product-table/product-status-tabs';
import { ProductTableContent } from './product-table/product-table-content';
import { Product } from '@repo/types/product';

function ProductTable() {
  const [paginationData, setPaginationData] = useState<{
    startIndex: number;
    endIndex: number;
  }>({ startIndex: 0, endIndex: 0 });
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  return (
    <React.Fragment>
      <div className="bg-background shadow-md">
        <div className="p-6">
          <ProductTableHeader />
          <ProductStatusTabs />
        </div>

        <div className="p-4">
          <ProductTableFilters />

          <div className="text-muted-foreground mb-4 text-sm">
            Showing{' '}
            <span className="font-medium">{paginationData.startIndex + 1}</span>{' '}
            to <span className="font-medium">{paginationData.endIndex}</span> of{' '}
            <span className="font-medium">{sortedProducts.length}</span>{' '}
            products
          </div>

          <ProductTableContent />
        </div>
      </div>
    </React.Fragment>
  );
}

export default memo(ProductTable);
