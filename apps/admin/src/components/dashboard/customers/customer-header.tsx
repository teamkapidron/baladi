'use client';

// Node Modules
import { memo, useMemo } from 'react';
import { Archive, Download } from '@repo/ui/lib/icons';
import { Button } from '@repo/ui/components/base/button';

// Components
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

// Hooks
import { useUsers } from '@/hooks/useUsers';

function CustomerHeader() {
  const { getUserStatsQuery } = useUsers();

  const metrics = useMemo(() => {
    return {
      totalCustomers: getUserStatsQuery.data?.totalUsers ?? 0,
      pendingCustomers: getUserStatsQuery.data?.pendingUsers ?? 0,
      approvedCustomers: getUserStatsQuery.data?.approvedUsers ?? 0,
    };
  }, [
    getUserStatsQuery.data?.totalUsers,
    getUserStatsQuery.data?.pendingUsers,
    getUserStatsQuery.data?.approvedUsers,
  ]);

  return (
    <div className="border-border border bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Customers Dashboard
          </h1>
          <div className="mt-2 flex items-center">
            <div className="text-sm text-white/90">
              <AnimatedCounter
                value={metrics.totalCustomers}
                className="font-medium text-white"
              />{' '}
              total customers •
              <AnimatedCounter
                value={metrics.pendingCustomers}
                className="ml-1 font-medium text-white"
              />{' '}
              pending approval
            </div>
            <div className="mx-2 h-4 w-px bg-white/20"></div>
            <div className="flex items-center text-sm text-white/90">
              <Archive className="mr-1 h-3.5 w-3.5 text-white/80" />
              <AnimatedCounter
                value={metrics.pendingCustomers}
                className="font-medium text-white"
              />
              <span className="ml-1">pending</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button className="h-9 bg-white/90 text-[var(--color-primary)] shadow-lg hover:bg-white">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomerHeader);
