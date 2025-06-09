'use client';

// Node Modules
import { memo, useMemo } from 'react';
import {
  ShoppingBag,
  ArrowUpRight,
  Clock,
  CheckCircle,
  TruckIcon,
  XCircle,
  DollarSign,
  TrendingUp,
  PieChart,
} from '@repo/ui/lib/icons';

// Components
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

// Hooks
import { useOrderStats } from '@/hooks/useOrder';

function OrderMetricCards() {
  const { orderStatsQuery, orderRevenueStatsQuery } = useOrderStats();

  const statusStats = useMemo(() => {
    const totalOrders = orderStatsQuery.data?.totalOrders ?? 0;
    const pendingOrders = orderStatsQuery.data?.pendingOrders ?? 0;
    const confirmedOrders = orderStatsQuery.data?.confirmedOrders ?? 0;
    const shippedOrders = orderStatsQuery.data?.shippedOrders ?? 0;
    const cancelledOrders = orderStatsQuery.data?.cancelledOrders ?? 0;

    const pendingPercent =
      totalOrders > 0 ? Math.round((pendingOrders / totalOrders) * 100) : 0;
    const confirmedPercent =
      totalOrders > 0 ? Math.round((confirmedOrders / totalOrders) * 100) : 0;
    const shippedPercent =
      totalOrders > 0 ? Math.round((shippedOrders / totalOrders) * 100) : 0;
    const cancelledPercent =
      totalOrders > 0 ? Math.round((cancelledOrders / totalOrders) * 100) : 0;

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      cancelledOrders,
      pendingPercent,
      confirmedPercent,
      shippedPercent,
      cancelledPercent,
    };
  }, [orderStatsQuery.data]);

  const revenueStats = useMemo(() => {
    const totalRevenue = orderRevenueStatsQuery.data?.totalRevenue ?? 0;
    const totalCost = orderRevenueStatsQuery.data?.totalCost ?? 0;
    const totalProfit = orderRevenueStatsQuery.data?.totalProfit ?? 0;
    const avgOrderValue =
      statusStats.totalOrders > 0 ? totalRevenue / statusStats.totalOrders : 0;
    const profitMargin =
      totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    return {
      totalRevenue,
      totalCost,
      totalProfit,
      avgOrderValue,
      profitMargin,
    };
  }, [orderRevenueStatsQuery.data, statusStats.totalOrders]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="to-[var(--baladi-primary)]/5 hover:shadow-[var(--baladi-primary)]/20 group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="bg-[var(--baladi-primary)]/10 absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--baladi-primary)] shadow-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-text-muted)]">
                Total Orders
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-text)]">
                  <AnimatedCounter value={statusStats.totalOrders} />
                </span>
                {statusStats.totalOrders > 0 && (
                  <div className="bg-[var(--baladi-success)]/10 flex items-center gap-1 rounded-full px-2 py-1">
                    <TrendingUp className="h-3 w-3 text-[var(--baladi-success)]" />
                    <span className="text-xs font-medium text-[var(--baladi-success)]">
                      Active
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--baladi-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--baladi-text-muted)]">
              Revenue Generated
            </span>
            <span className="font-medium text-[var(--baladi-text)]">
              $
              <AnimatedCounter value={revenueStats.totalRevenue} />
            </span>
          </div>
        </div>
      </div>

      <div className="to-[var(--baladi-warning)]/5 hover:shadow-[var(--baladi-warning)]/20 group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="bg-[var(--baladi-warning)]/10 absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--baladi-warning)] shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-text-muted)]">
                Pending Orders
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-text)]">
                  <AnimatedCounter value={statusStats.pendingOrders} />
                </span>
                <div className="bg-[var(--baladi-warning)]/10 flex items-center gap-1 rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-[var(--baladi-warning)]">
                    {statusStats.pendingPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--baladi-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--baladi-text-muted)]">
              Awaiting Processing
            </span>
            <span className="font-medium text-[var(--baladi-warning)]">
              {statusStats.pendingOrders} orders
            </span>
          </div>
        </div>
      </div>

      <div className="to-[var(--baladi-secondary)]/5 hover:shadow-[var(--baladi-secondary)]/20 group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="bg-[var(--baladi-secondary)]/10 absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--baladi-secondary)] shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-text-muted)]">
                Confirmed Orders
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-text)]">
                  <AnimatedCounter value={statusStats.confirmedOrders} />
                </span>
                <div className="bg-[var(--baladi-secondary)]/10 flex items-center gap-1 rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-[var(--baladi-secondary)]">
                    {statusStats.confirmedPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--baladi-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--baladi-text-muted)]">
              Ready to Ship
            </span>
            <span className="font-medium text-[var(--baladi-secondary)]">
              {statusStats.confirmedOrders} orders
            </span>
          </div>
        </div>
      </div>

      <div className="to-[var(--baladi-success)]/5 hover:shadow-[var(--baladi-success)]/20 group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="bg-[var(--baladi-success)]/10 absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--baladi-success)] shadow-lg">
              <TruckIcon className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-text-muted)]">
                Shipped Orders
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-text)]">
                  <AnimatedCounter value={statusStats.shippedOrders} />
                </span>
                <div className="bg-[var(--baladi-success)]/10 flex items-center gap-1 rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-[var(--baladi-success)]">
                    {statusStats.shippedPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--baladi-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--baladi-text-muted)]">In Transit</span>
            <span className="font-medium text-[var(--baladi-success)]">
              {statusStats.shippedOrders} orders
            </span>
          </div>
        </div>
      </div>

      <div className="to-[var(--baladi-error)]/5 hover:shadow-[var(--baladi-error)]/20 group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="bg-[var(--baladi-error)]/10 absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--baladi-error)] shadow-lg">
              <XCircle className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-text-muted)]">
                Cancelled Orders
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-text)]">
                  <AnimatedCounter value={statusStats.cancelledOrders} />
                </span>
                <div className="bg-[var(--baladi-error)]/10 flex items-center gap-1 rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-[var(--baladi-error)]">
                    {statusStats.cancelledPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--baladi-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--baladi-text-muted)]">
              Refund Pending
            </span>
            <span className="font-medium text-[var(--baladi-error)]">
              {statusStats.cancelledOrders} orders
            </span>
          </div>
        </div>
      </div>

      <div className="to-[var(--baladi-success)]/5 hover:shadow-[var(--baladi-success)]/20 group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="bg-[var(--baladi-success)]/10 absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--baladi-success)] shadow-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-text-muted)]">
                Total Revenue
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-text)]">
                  $<AnimatedCounter value={revenueStats.totalRevenue} />
                </span>
                {revenueStats.totalRevenue > 0 && (
                  <div className="bg-[var(--baladi-success)]/10 flex items-center gap-1 rounded-full px-2 py-1">
                    <ArrowUpRight className="h-3 w-3 text-[var(--baladi-success)]" />
                    <span className="text-xs font-medium text-[var(--baladi-success)]">
                      Revenue
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--baladi-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--baladi-text-muted)]">Total Cost</span>
            <span className="font-medium text-[var(--baladi-text)]">
              $<AnimatedCounter value={revenueStats.totalCost} />
            </span>
          </div>
        </div>
      </div>

      <div className="to-[var(--baladi-accent)]/5 hover:shadow-[var(--baladi-accent)]/20 group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="bg-[var(--baladi-accent)]/10 absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--baladi-accent)] shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-text-muted)]">
                Total Profit
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-text)]">
                  $<AnimatedCounter value={revenueStats.totalProfit} />
                </span>
                {revenueStats.profitMargin > 0 && (
                  <div className="bg-[var(--baladi-accent)]/10 flex items-center gap-1 rounded-full px-2 py-1">
                    <span className="text-xs font-medium text-[var(--baladi-accent)]">
                      {revenueStats.profitMargin.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--baladi-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--baladi-text-muted)]">
              Profit Margin
            </span>
            <span className="font-medium text-[var(--baladi-accent)]">
              {revenueStats.profitMargin.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className="to-[var(--baladi-secondary)]/5 hover:shadow-[var(--baladi-secondary)]/20 group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="bg-[var(--baladi-secondary)]/10 absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-110"></div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--baladi-secondary)] shadow-lg">
              <PieChart className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-text-muted)]">
                Avg. Order Value
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-text)]">
                  $<AnimatedCounter value={revenueStats.avgOrderValue} />
                </span>
                {revenueStats.avgOrderValue > 0 && (
                  <div className="bg-[var(--baladi-secondary)]/10 flex items-center gap-1 rounded-full px-2 py-1">
                    <span className="text-xs font-medium text-[var(--baladi-secondary)]">
                      AOV
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[var(--baladi-border)] pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--baladi-text-muted)]">
              Per Customer
            </span>
            <span className="font-medium text-[var(--baladi-secondary)]">
              ${revenueStats.avgOrderValue.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderMetricCards);
