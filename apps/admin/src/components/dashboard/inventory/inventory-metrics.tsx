'use client';

import { memo, useMemo } from 'react';
import {
  Package,
  AlertTriangle,
  XCircle,
  DollarSign,
  TrendingUp,
} from '@repo/ui/lib/icons';
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

function InventoryMetrics() {
  const metrics = useMemo(() => {
    return {
      totalProducts: 247,
      inStockProducts: 230,
      lowStockProducts: 12,
      outOfStockProducts: 5,
      totalValue: 45789.5,
      lowStockPercentage: 5,
      outOfStockPercentage: 2,
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Products Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-[var(--color-primary)] shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Total Products
            </h3>
            <div className="bg-[var(--color-primary)]/10 flex h-7 w-7 items-center justify-center">
              <Package className="h-4 w-4 text-[var(--color-primary)]" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              <AnimatedCounter value={metrics.totalProducts} />
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">In Stock</span>
              <span className="text-foreground text-sm font-medium">
                <AnimatedCounter value={metrics.inStockProducts} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-amber-500 shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Low Stock Items
            </h3>
            <div className="flex h-7 w-7 items-center justify-center bg-amber-500/10">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              <AnimatedCounter value={metrics.lowStockProducts} />
            </span>
            <span className="flex items-center bg-amber-500/10 px-1.5 py-0.5 text-xs font-medium text-amber-600">
              Needs attention
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Percentage</span>
              <span className="text-sm font-medium text-amber-600">
                <AnimatedCounter value={metrics.lowStockPercentage} />%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Out of Stock Card */}
      <div className="bg-background border-l-destructive border-border border-b border-l-4 border-r border-t shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Out of Stock
            </h3>
            <div className="bg-destructive/10 flex h-7 w-7 items-center justify-center">
              <XCircle className="text-destructive h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              <AnimatedCounter value={metrics.outOfStockProducts} />
            </span>
            <span className="text-destructive bg-destructive/10 flex items-center px-1.5 py-0.5 text-xs font-medium">
              Critical
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Percentage</span>
              <span className="text-destructive text-sm font-medium">
                <AnimatedCounter value={metrics.outOfStockPercentage} />%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Total Value Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-[var(--color-success)] shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">Total Value</h3>
            <div className="bg-[var(--color-success)]/10 flex h-7 w-7 items-center justify-center">
              <DollarSign className="h-4 w-4 text-[var(--color-success)]" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              ${metrics.totalValue.toLocaleString()}
            </span>
            <span className="bg-[var(--color-success)]/10 flex items-center px-1.5 py-0.5 text-xs font-medium text-[var(--color-success)]">
              <TrendingUp className="mr-0.5 h-3 w-3" />
              8.2%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Inventory Value
              </span>
              <span className="text-sm font-medium text-[var(--color-success)]">
                Total Assets
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(InventoryMetrics);
