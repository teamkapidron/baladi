'use client';

import { useState } from 'react';
import { BarChart3, Trash } from '@repo/ui/lib/icons';

interface ProductTableHeaderProps {
  activeTab: string;
  selectedProducts: string[];
  handleBulkDelete: () => void;
}

export function ProductTableHeader() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleBulkDelete = () => {
    console.log('Bulk delete');
  };

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center">
        <h2 className="text-foreground mr-3 text-lg font-medium">Products</h2>
        <div className="flex items-center bg-[var(--color-primary)] px-3 py-1.5 text-xs font-medium text-white">
          <BarChart3 className="mr-1.5 h-3 w-3 text-white" />
          {activeTab === 'all'
            ? 'All Products'
            : activeTab === 'active'
              ? 'Active Products'
              : activeTab === 'outOfStock'
                ? 'Out of Stock'
                : 'Low Stock'}
        </div>
      </div>
      {selectedProducts.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            {selectedProducts.length} selected
          </span>
          <button
            className="border-destructive text-destructive hover:bg-destructive/10 inline-flex h-8 items-center justify-center rounded-none border px-3 text-sm"
            onClick={handleBulkDelete}
          >
            <Trash className="mr-1.5 h-3.5 w-3.5" />
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
}
