'use client';

import { Archive, Calendar, Download, Plus } from '@repo/ui/lib/icons';

export function ProductsHeader() {
  const totalProducts: number = 100;
  const outOfStockProducts: number = 10;
  const timeframe: string = 'week';
  const setTimeframe: (timeframe: string) => void = () => {};
  const onCreateProduct: () => void = () => {};

  return (
    <div className="border-border border bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Products Dashboard
          </h1>
          <div className="mt-2 flex items-center">
            <p className="text-sm text-white/90">
              <span className="font-medium text-white">{totalProducts}</span>{' '}
              products
            </p>
            <div className="mx-2 h-4 w-px bg-white/20"></div>
            <div className="flex items-center text-sm text-white/90">
              <Archive className="mr-1 h-3.5 w-3.5 text-white/80" />
              <span className="font-medium text-white">
                {outOfStockProducts}
              </span>
              <span className="ml-1">out of stock</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {onCreateProduct ? (
            <button
              onClick={onCreateProduct}
              className="hover:bg-[var(--color-accent)]/90 flex h-9 items-center bg-[var(--color-accent)] px-4 py-2 text-white shadow-lg"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Product
            </button>
          ) : (
            <a
              href="/dashboard/products/new"
              className="hover:bg-[var(--color-accent)]/90 flex h-9 items-center bg-[var(--color-accent)] px-4 py-2 text-white shadow-lg"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Product
            </a>
          )}

          <button className="flex h-9 items-center bg-white/90 px-4 py-2 text-[var(--color-primary)] shadow-lg hover:bg-white">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export
          </button>

          <div className="relative">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-[var(--color-primary)]/80 h-9 appearance-none border border-white/20 px-8 py-2 text-white"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <Calendar className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transform text-white/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
