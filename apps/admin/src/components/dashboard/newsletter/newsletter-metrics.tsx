'use client';

import { memo, useMemo } from 'react';
import { Users, UserX, SendHorizonal } from '@repo/ui/lib/icons';
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

function NewsletterMetrics() {
  const metrics = useMemo(() => {
    return {
      subscribers: 2845,
      unsubscribed: 156,
      campaignsSent: 24,
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-[var(--color-primary)] shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">Subscribers</h3>
            <div className="bg-[var(--color-primary)]/10 flex h-7 w-7 items-center justify-center">
              <Users className="h-4 w-4 text-[var(--color-primary)]" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              <AnimatedCounter value={metrics.subscribers} />
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center text-sm text-green-600">
              <span className="text-muted-foreground text-xs">
                Active subscribers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Unsubscribed Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-[var(--color-destructive)] shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Unsubscribed
            </h3>
            <div className="bg-[var(--color-destructive)]/10 flex h-7 w-7 items-center justify-center">
              <UserX className="h-4 w-4 text-[var(--color-destructive)]" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              <AnimatedCounter value={metrics.unsubscribed} />
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center">
              <span className="text-muted-foreground text-xs">
                Total unsubscribes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Sent Card */}
      <div className="bg-background border-border border-b border-l-4 border-r border-t border-l-amber-500 shadow-md">
        <div className="border-border border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-sm font-medium">
              Campaigns Sent
            </h3>
            <div className="flex h-7 w-7 items-center justify-center bg-amber-500/10">
              <SendHorizonal className="h-4 w-4 text-amber-500" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-bold">
              <AnimatedCounter value={metrics.campaignsSent} />
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center">
              <span className="text-muted-foreground text-xs">This year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(NewsletterMetrics);
