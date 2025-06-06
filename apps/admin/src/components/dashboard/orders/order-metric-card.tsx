import {
  ShoppingBag,
  ArrowUpRight,
  Clock,
  CheckCircle,
  TruckIcon,
  XCircle,
  DollarSign,
  TrendingUp,
  CreditCard,
} from '@repo/ui/lib/icons';

export function OrderMetricCards() {
  const ordersByStatus: any[] = [];

  const pendingOrders = ordersByStatus.find((s) => s._id === 'pending') || {
    count: 0,
    revenue: 0,
  };
  const confirmedOrders = ordersByStatus.find((s) => s._id === 'confirmed') || {
    count: 0,
    revenue: 0,
  };
  const shippedOrders = ordersByStatus.find((s) => s._id === 'shipped') || {
    count: 0,
    revenue: 0,
  };
  const cancelledOrders = ordersByStatus.find((s) => s._id === 'cancelled') || {
    count: 0,
    revenue: 0,
  };

  const totalOrders = 100;
  const pendingPercent = Math.round((pendingOrders.count / totalOrders) * 100);
  const confirmedPercent = Math.round(
    (confirmedOrders.count / totalOrders) * 100,
  );
  const shippedPercent = Math.round((shippedOrders.count / totalOrders) * 100);
  const cancelledPercent = Math.round(
    (cancelledOrders.count / totalOrders) * 100,
  );

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Orders Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-[var(--color-primary)] shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Total Orders
            </h3>
            <div className="bg-[var(--color-primary)]/10 flex h-7 w-7 items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-[var(--color-primary)]" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">100</span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Total Revenue
              </span>
              <span className="text-foreground text-sm font-medium">$1000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Avg. Order Value
              </span>
              <span className="text-foreground text-sm font-medium">$10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Orders Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-amber-500 shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Pending Orders
            </h3>
            <div className="flex h-7 w-7 items-center justify-center bg-amber-500/10">
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              {pendingOrders.count}
            </span>
            <span className="flex items-center bg-amber-500/10 px-1.5 py-0.5 text-xs font-medium text-amber-600">
              {pendingPercent}%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Revenue</span>
              <span className="text-sm font-medium text-amber-600">
                ${pendingOrders.revenue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmed Orders Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-blue-500 shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Confirmed Orders
            </h3>
            <div className="flex h-7 w-7 items-center justify-center bg-blue-500/10">
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              {confirmedOrders.count}
            </span>
            <span className="flex items-center bg-blue-500/10 px-1.5 py-0.5 text-xs font-medium text-blue-600">
              {confirmedPercent}%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Revenue</span>
              <span className="text-sm font-medium text-blue-600">
                ${confirmedOrders.revenue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipped Orders Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-purple-500 shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Shipped Orders
            </h3>
            <div className="flex h-7 w-7 items-center justify-center bg-purple-500/10">
              <TruckIcon className="h-4 w-4 text-purple-500" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              {shippedOrders.count}
            </span>
            <span className="flex items-center bg-purple-500/10 px-1.5 py-0.5 text-xs font-medium text-purple-600">
              {shippedPercent}%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Revenue</span>
              <span className="text-sm font-medium text-purple-600">
                ${shippedOrders.revenue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cancelled Orders Card */}
      <div className="bg-background border-l-destructive border-border border-b border-l-4 border-r border-t shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Cancelled Orders
            </h3>
            <div className="bg-destructive/10 flex h-7 w-7 items-center justify-center">
              <XCircle className="text-destructive h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              {cancelledOrders.count}
            </span>
            <span className="text-destructive bg-destructive/10 flex items-center px-1.5 py-0.5 text-xs font-medium">
              {cancelledPercent}%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Revenue Lost
              </span>
              <span className="text-destructive text-sm font-medium">
                ${cancelledOrders.revenue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-green-500 shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Total Revenue
            </h3>
            <div className="flex h-7 w-7 items-center justify-center bg-green-500/10">
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">$1000</span>
            <span className="flex items-center bg-green-500/10 px-1.5 py-0.5 text-xs font-medium text-green-600">
              <ArrowUpRight className="mr-0.5 h-3 w-3" />
              12.4%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Confirmed Revenue
              </span>
              <span className="text-sm font-medium text-green-600">
                ${confirmedOrders.revenue.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Pending Revenue
              </span>
              <span className="text-sm font-medium text-amber-600">
                ${pendingOrders.revenue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Average Order Value Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-cyan-500 shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Avg. Order Value
            </h3>
            <div className="flex h-7 w-7 items-center justify-center bg-cyan-500/10">
              <CreditCard className="h-4 w-4 text-cyan-500" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">$10</span>
            <span className="flex items-center bg-cyan-500/10 px-1.5 py-0.5 text-xs font-medium text-cyan-600">
              <ArrowUpRight className="mr-0.5 h-3 w-3" />
              5.2%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Highest Order
              </span>
              <span className="text-sm font-medium text-cyan-600">$1000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Lowest Order
              </span>
              <span className="text-sm font-medium text-cyan-600">$10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Trend Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-indigo-500 shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">Daily Trend</h3>
            <div className="flex h-7 w-7 items-center justify-center bg-indigo-500/10">
              <TrendingUp className="h-4 w-4 text-indigo-500" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">17</span>
            <span className="flex items-center bg-indigo-500/10 px-1.5 py-0.5 text-xs font-medium text-indigo-600">
              Last 5 days
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Best Day</span>
              <span className="text-sm font-medium text-indigo-600">
                May 28 (10 orders)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Revenue</span>
              <span className="text-sm font-medium text-indigo-600">$1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
