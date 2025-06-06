import { Button } from '@repo/ui/components/base/button';
import { Archive, Download } from '@repo/ui/lib/icons';
import { useMemo } from 'react';

export function CustomerHeader() {
  const metrics = useMemo(() => {
    const totalCustomers = 100;
    const pendingCustomers = 10;

    return {
      totalCustomers,
      pendingCustomers,
    };
  }, []);

  return (
    <div className="border-border border bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Customers Dashboard
          </h1>
          <div className="mt-2 flex items-center">
            <p className="text-sm text-white/90">
              <span className="font-medium text-white">
                {metrics.totalCustomers}
              </span>{' '}
              total customers •
              <span className="ml-1 font-medium text-white">
                {metrics.pendingCustomers}
              </span>{' '}
              pending approval
            </p>
            <div className="mx-2 h-4 w-px bg-white/20"></div>
            <div className="flex items-center text-sm text-white/90">
              <Archive className="mr-1 h-3.5 w-3.5 text-white/80" />
              <span className="font-medium text-white">
                {metrics.pendingCustomers}
              </span>
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
