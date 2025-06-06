'use client';

import { useState } from 'react';

export function ProductStatusTabs() {
  const [activeTab, setActiveTab] = useState<string>('all');

  return (
    <div className="border-border no-scrollbar mt-5 flex gap-1 overflow-x-auto border-b">
      <button
        onClick={() => setActiveTab('all')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'all'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        All Products
      </button>
      <button
        onClick={() => setActiveTab('active')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'active'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        Active
      </button>
      <button
        onClick={() => setActiveTab('outOfStock')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'outOfStock'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        Out of Stock
      </button>
      <button
        onClick={() => setActiveTab('lowStock')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'lowStock'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        Low Stock
      </button>
    </div>
  );
}
