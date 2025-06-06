import {
  Archive,
  ArrowUpRight,
  DollarSign,
  ShoppingBag,
  TrendingUp,
} from '@repo/ui/lib/icons';

export function MetricCards() {
  const totalProducts: number = 100;
  const activeProducts: number = 80;
  const totalValue: number = 1000;
  const avgPrice: number = 10;
  const lowStockProducts: number = 10;
  const outOfStockProducts: number = 5;
  const totalSales: number = 1000;

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
              <ShoppingBag className="h-4 w-4 text-[var(--color-primary)]" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              {totalProducts}
            </span>
            <span className="bg-[var(--color-success)]/10 flex items-center px-1.5 py-0.5 text-xs font-medium text-[var(--color-success)]">
              <ArrowUpRight className="mr-0.5 h-3 w-3" />
              8.5%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Active Products
              </span>
              <span className="text-foreground text-sm font-medium">
                {activeProducts} (
                {Math.round((activeProducts / totalProducts) * 100)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Value Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-[var(--color-accent)] shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Inventory Value
            </h3>
            <div className="bg-[var(--color-accent)]/10 flex h-7 w-7 items-center justify-center">
              <DollarSign className="h-4 w-4 text-[var(--color-accent)]" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              ${totalValue?.toFixed(0)}
            </span>
            <span className="bg-[var(--color-success)]/10 flex items-center px-1.5 py-0.5 text-xs font-medium text-[var(--color-success)]">
              <ArrowUpRight className="mr-0.5 h-3 w-3" />
              12.3%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Avg. Product Value
              </span>
              <span className="text-foreground text-sm font-medium">
                ${avgPrice?.toFixed(2)}
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
              <Archive className="h-4 w-4 text-amber-500" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              {lowStockProducts + outOfStockProducts}
            </span>
            <span className="flex items-center bg-amber-500/10 px-1.5 py-0.5 text-xs font-medium text-amber-600">
              Needs attention
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Out of Stock
              </span>
              <span className="text-destructive text-sm font-medium">
                {outOfStockProducts}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Performance Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-[var(--color-chart-1)] shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Sales Performance
            </h3>
            <div className="bg-[var(--color-chart-1)]/10 flex h-7 w-7 items-center justify-center">
              <TrendingUp className="h-4 w-4 text-[var(--color-chart-1)]" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              {totalSales}
            </span>
            <span className="bg-[var(--color-success)]/10 flex items-center px-1.5 py-0.5 text-xs font-medium text-[var(--color-success)]">
              <ArrowUpRight className="mr-0.5 h-3 w-3" />
              7.2%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Low Stock Items
              </span>
              <span className="text-foreground text-sm font-medium">
                {lowStockProducts}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
