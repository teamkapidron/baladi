'use client';

// Node Modules
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { Users, ArrowRight, Crown, Mail } from '@repo/ui/lib/icons';

// Hooks
import { useUsers } from '@/hooks/useUsers';

function TopCustomers() {
  const { getTopUsersQuery } = useUsers();

  const customers = useMemo(() => {
    return getTopUsersQuery.data?.topUsers ?? [];
  }, [getTopUsersQuery.data]);

  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-[var(--baladi-border)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
            Top Customers
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Highest value customers by total spending
          </p>
        </div>
        <Link
          href="/dashboard/customers"
          className="bg-[var(--baladi-primary)]/10 hover:bg-[var(--baladi-primary)]/20 group flex items-center gap-1 rounded-lg px-3 py-1.5 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)] transition-colors"
        >
          View All
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {customers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--baladi-muted)]">
            <Users className="h-8 w-8 text-[var(--baladi-gray)]" />
          </div>
          <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            No customer data yet
          </h4>
          <p className="mb-4 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Top customers will appear here once you have sales data.
          </p>
          <Link
            href="/dashboard/customers"
            className="hover:bg-[var(--baladi-primary)]/90 inline-flex items-center gap-2 rounded-lg bg-[var(--baladi-primary)] px-4 py-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-white transition-colors"
          >
            <Users className="h-4 w-4" />
            View Customers
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {customers.map((customer, index) => (
            <div
              key={customer.user._id || index}
              className="hover:border-[var(--baladi-primary)]/20 group rounded-lg border border-[var(--baladi-border)] p-4 transition-all duration-200 hover:bg-[var(--baladi-light)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="from-[var(--baladi-secondary)]/10 to-[var(--baladi-primary)]/10 relative flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br">
                    <Users className="h-6 w-6 text-[var(--baladi-secondary)]" />
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-secondary)] text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    {index === 0 && (
                      <Crown className="absolute -right-2 -top-2 h-4 w-4 text-[var(--baladi-accent)]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                        {customer.user.userName}
                      </span>
                      {index < 3 && (
                        <span className="bg-[var(--baladi-accent)]/10 rounded-full px-2 py-0.5 font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-accent)]">
                          VIP
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">
                        {customer.user.userEmail}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-[family-name:var(--font-sora)] text-sm font-bold text-[var(--baladi-dark)]">
                    ${customer.totalAmount?.toFixed(2) || '0.00'}
                  </div>
                  <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                    {customer.totalOrders} order
                    {customer.totalOrders !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {customers.length > 0 && (
            <div className="mt-4 rounded-lg bg-[var(--baladi-light)] p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    Showing top {customers.length} customers
                  </p>
                  <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                    Based on total spending amount
                  </p>
                </div>
                <Link
                  href="/dashboard/customers"
                  className="hover:text-[var(--baladi-primary)]/80 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-primary)]"
                >
                  View All Customers →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(TopCustomers);
