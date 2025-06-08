'use client';

import { memo, useMemo } from 'react';
import { Package, AlertTriangle, Download } from '@repo/ui/lib/icons';
import { Button } from '@repo/ui/components/base/button';
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

function InventoryHeader() {
  const metrics = useMemo(() => {
    return {
      totalProducts: 247,
      lowStockItems: 12,
      outOfStockItems: 5,
      totalValue: 45789.5,
    };
  }, []);

  return (
    <div className="border-border border bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Inventory Management
          </h1>
          <div className="mt-2 flex items-center">
            <div className="text-sm text-white/90">
              <AnimatedCounter
                value={metrics.totalProducts}
                className="font-medium text-white"
              />{' '}
              total products •
              <AnimatedCounter
                value={metrics.lowStockItems}
                className="ml-1 font-medium text-white"
              />{' '}
              low stock alerts
            </div>
            <div className="mx-2 h-4 w-px bg-white/20"></div>
            <div className="flex items-center text-sm text-white/90">
              <AlertTriangle className="mr-1 h-3.5 w-3.5 text-white/80" />
              <AnimatedCounter
                value={metrics.outOfStockItems}
                className="font-medium text-white"
              />
              <span className="ml-1">out of stock</span>
            </div>
            <div className="mx-2 h-4 w-px bg-white/20"></div>
            <div className="flex items-center text-sm text-white/90">
              <Package className="mr-1 h-3.5 w-3.5 text-white/80" />
              <span className="font-medium text-white">
                ${metrics.totalValue.toLocaleString()}
              </span>
              <span className="ml-1">total value</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button className="h-9 bg-white/90 text-[var(--color-primary)] shadow-lg hover:bg-white">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(InventoryHeader);
