import { useMemo } from 'react';
import {
  Users,
  UserCheck,
  Clock,
  UserX,
  ArrowUpRight,
} from '@repo/ui/lib/icons';

export function CustomerMetricCards() {
  const metrics = useMemo(() => {
    const totalCustomers = 100;
    const approvedCustomers = 80;
    const pendingCustomers = 10;
    const unverifiedCustomers = 10;

    return {
      totalCustomers,
      approvedCustomers,
      pendingCustomers,
      unverifiedCustomers,
      approvalRate: Math.round((approvedCustomers / totalCustomers) * 100) || 0,
      pendingRate: Math.round((pendingCustomers / totalCustomers) * 100) || 0,
      unverifiedRate:
        Math.round((unverifiedCustomers / totalCustomers) * 100) || 0,
    };
  }, []);

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
              {metrics.totalCustomers}
            </span>
            <span className="bg-[var(--color-success)]/10 flex items-center px-1.5 py-0.5 text-xs font-medium text-[var(--color-success)]">
              <ArrowUpRight className="mr-0.5 h-3 w-3" />
              8.5%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Approved Customers
              </span>
              <span className="text-foreground text-sm font-medium">
                {metrics.approvedCustomers} ({metrics.approvalRate}%)
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
              {metrics.approvedCustomers}
            </span>
            <span className="bg-[var(--color-success)]/10 flex items-center px-1.5 py-0.5 text-xs font-medium text-[var(--color-success)]">
              <ArrowUpRight className="mr-0.5 h-3 w-3" />
              12.3%
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                Approval Rate
              </span>
              <span className="text-foreground text-sm font-medium">
                {metrics.approvalRate}%
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
              {metrics.pendingCustomers}
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
                {metrics.pendingRate}%
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
              {metrics.unverifiedCustomers}
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
                {metrics.unverifiedRate}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
