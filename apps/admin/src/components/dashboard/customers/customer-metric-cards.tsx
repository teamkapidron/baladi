'use client';

// Node Modules
import { memo, useMemo } from 'react';
import {
  Users,
  UserCheck,
  Clock,
  UserX,
  ArrowUpRight,
} from '@repo/ui/lib/icons';

// Components
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

// Hooks
import { useUsers } from '@/hooks/useUsers';

function CustomerMetricCards() {
  const { getUserStatsQuery } = useUsers();

  const metrics = useMemo(() => {
    const totalCustomers = getUserStatsQuery.data?.totalUsers ?? 0;
    const approvedCustomers = getUserStatsQuery.data?.approvedUsers ?? 0;
    const pendingCustomers = getUserStatsQuery.data?.pendingUsers ?? 0;
    const unverifiedCustomers = getUserStatsQuery.data?.unverifiedUsers ?? 0;

    return {
      totalCustomers,
      approvedCustomers,
      pendingCustomers,
      unverifiedCustomers,
      approvalRate: Math.round((approvedCustomers / totalCustomers) * 100) ?? 0,
      pendingRate: Math.round((pendingCustomers / totalCustomers) * 100) ?? 0,
      unverifiedRate:
        Math.round((unverifiedCustomers / totalCustomers) * 100) ?? 0,
    };
  }, [getUserStatsQuery.data]);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Customers Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-[var(--color-primary)] shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Total Customers
            </h3>
            <div className="bg-[var(--color-primary)]/10 flex h-7 w-7 items-center justify-center">
              <Users className="h-4 w-4 text-[var(--color-primary)]" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              <AnimatedCounter value={metrics.totalCustomers} />
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Approved Customers
              </span>
              <span className="text-foreground text-sm font-medium">
                <AnimatedCounter value={metrics.approvedCustomers} /> (
                <AnimatedCounter value={metrics.approvalRate} />
                %)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Approved Customers Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-[var(--color-success)] shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Approved Customers
            </h3>
            <div className="bg-[var(--color-success)]/10 flex h-7 w-7 items-center justify-center">
              <UserCheck className="h-4 w-4 text-[var(--color-success)]" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              <AnimatedCounter value={metrics.approvedCustomers} />
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Approval Rate
              </span>
              <span className="text-foreground text-sm font-medium">
                <AnimatedCounter value={metrics.approvalRate} />%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Customers Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-amber-500 shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Pending Customers
            </h3>
            <div className="flex h-7 w-7 items-center justify-center bg-amber-500/10">
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              <AnimatedCounter value={metrics.pendingCustomers} />
            </span>
            <span className="flex items-center bg-amber-500/10 px-1.5 py-0.5 text-xs font-medium text-amber-600">
              Needs attention
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Pending Rate
              </span>
              <span className="text-sm font-medium text-amber-600">
                <AnimatedCounter value={metrics.pendingRate} />%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Unverified Customers Card */}
      <div className="bg-background border-l-destructive border-border border-b border-l-4 border-r border-t shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Unverified Customers
            </h3>
            <div className="bg-destructive/10 flex h-7 w-7 items-center justify-center">
              <UserX className="text-destructive h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              <AnimatedCounter value={metrics.unverifiedCustomers} />
            </span>
            <span className="text-destructive bg-destructive/10 flex items-center px-1.5 py-0.5 text-xs font-medium">
              <ArrowUpRight className="mr-0.5 h-3 w-3" />
              7.2%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Unverified Rate
              </span>
              <span className="text-destructive text-sm font-medium">
                <AnimatedCounter value={metrics.unverifiedRate} />%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomerMetricCards);
