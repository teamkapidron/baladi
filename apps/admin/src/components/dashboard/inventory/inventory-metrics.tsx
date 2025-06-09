'use client';

// Node Modules
import { memo, useMemo } from 'react';
import {
  Package,
  AlertTriangle,
  XCircle,
  DollarSign,
} from '@repo/ui/lib/icons';

// Components
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

// Hooks
import { useInventoryStats } from '@/hooks/useInventory';

function InventoryMetrics() {
  const { inventoryStatsQuery } = useInventoryStats();

  const metrics = useMemo(() => {
    return {
      outOfStockCount: inventoryStatsQuery.data?.outOfStockCount ?? 0,
      lowStockCount: inventoryStatsQuery.data?.lowStockCount ?? 0,
      totalInventoryValue: inventoryStatsQuery.data?.totalInventoryValue ?? 0,
    };
  }, [inventoryStatsQuery.data]);

  const totalStockIssues = metrics.outOfStockCount + metrics.lowStockCount;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="group relative overflow-hidden rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-green-500/10" />
        <div className="relative p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 shadow-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-900">
                $<AnimatedCounter value={metrics.totalInventoryValue} />
              </p>
              <p className="text-sm font-medium text-green-600">
                Total Inventory Value
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Asset Worth</span>
              <span className="text-sm font-semibold text-green-900">
                ${(metrics.totalInventoryValue / 1000).toFixed(1)}K
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-green-200">
              <div className="h-2 w-full rounded-full bg-green-500 transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-orange-500/10" />
        <div className="relative p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-900">
                <AnimatedCounter value={totalStockIssues} />
              </p>
              <p className="text-sm font-medium text-orange-600">
                Total Stock Issues
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-orange-700">Items Affected</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-orange-900">
                  <AnimatedCounter value={totalStockIssues} />
                </span>
                <span className="text-xs text-orange-600">items</span>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-orange-200">
              <div
                className="h-2 rounded-full bg-orange-500 transition-all duration-500"
                style={{
                  width: totalStockIssues > 0 ? '75%' : '0%',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-amber-500/10" />
        <div className="relative p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 shadow-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-amber-900">
                <AnimatedCounter value={metrics.lowStockCount} />
              </p>
              <p className="text-sm font-medium text-amber-600">
                Low Stock Items
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-700">Status</span>
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                {metrics.lowStockCount > 0 ? 'Needs Attention' : 'Good'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-700">Priority</span>
              <span className="text-sm font-semibold text-amber-900">
                {metrics.lowStockCount > 10
                  ? 'High'
                  : metrics.lowStockCount > 0
                    ? 'Medium'
                    : 'Low'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-red-500/10" />
        <div className="relative p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 shadow-lg">
              <XCircle className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-900">
                <AnimatedCounter value={metrics.outOfStockCount} />
              </p>
              <p className="text-sm font-medium text-red-600">Out of Stock</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-700">Status</span>
              <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                {metrics.outOfStockCount > 0 ? 'Critical' : 'Good'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-700">Action Required</span>
              <span className="text-sm font-semibold text-red-900">
                {metrics.outOfStockCount > 0 ? 'Urgent' : 'None'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(InventoryMetrics);
