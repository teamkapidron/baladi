'use client';

// Node Modules
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { User, ArrowRight, ShoppingBag } from '@repo/ui/lib/icons';

// Hooks
import { useOrder } from '@/hooks/useOrder';

function RecentOrdersOverview() {
  const { recentOrdersQuery } = useOrder();

  const recentOrders = useMemo(() => {
    return recentOrdersQuery.data?.orders ?? [];
  }, [recentOrdersQuery.data]);

  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-[var(--baladi-border)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
            Recent Orders
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Latest customer orders and status updates
          </p>
        </div>
        <Link
          href="/dashboard/orders"
          className="bg-[var(--baladi-primary)]/10 hover:bg-[var(--baladi-primary)]/20 group flex items-center gap-1 rounded-lg px-3 py-1.5 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)] transition-colors"
        >
          View All
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--baladi-muted)]">
            <ShoppingBag className="h-8 w-8 text-[var(--baladi-gray)]" />
          </div>
          <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            No recent orders
          </h4>
          <p className="mb-4 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Recent customer orders will appear here once you start receiving
            orders.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order._id}
              className="hover:border-[var(--baladi-primary)]/20 group rounded-lg border border-[var(--baladi-border)] p-3 transition-all duration-200 hover:bg-[var(--baladi-light)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-secondary)]/10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br">
                    <User className="h-4 w-4 text-[var(--baladi-primary)]" />
                  </div>

                  {/* Order Info */}
                  <div className="min-w-0 flex-1">
                    <div className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      {order.user.name}
                    </div>
                    <div className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      <span>{order._id}</span>
                      <span>•</span>
                      <span>
                        {order.itemsCount} item{order.itemsCount > 1 ? 's' : ''}
                      </span>
                      <span>•</span>
                      <span>{order.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <div className="font-[family-name:var(--font-dm-sans)] text-sm font-bold text-[var(--baladi-dark)]">
                    ${order.totalAmount}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(RecentOrdersOverview);
