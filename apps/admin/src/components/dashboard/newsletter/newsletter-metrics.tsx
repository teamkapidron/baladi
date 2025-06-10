'use client';

// Node Modules
import { memo, useMemo } from 'react';
import { Users, UserX, SendHorizonal, TrendingUp } from '@repo/ui/lib/icons';

// Components
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

// Hooks
import { useNewsletter } from '@/hooks/useNewsletter';

function NewsletterMetrics() {
  const { newsLetterStatsQuery } = useNewsletter();

  const metrics = useMemo(() => {
    const data = newsLetterStatsQuery.data;
    return {
      subscribers: data?.subscriberCount ?? 0,
      unsubscribed: data?.unsubscribedSubscribers ?? 0,
      campaignsSent: data?.campaignCount ?? 0,
    };
  }, [newsLetterStatsQuery.data]);

  const { engagementRate, totalReach } = useMemo(() => {
    const totalUsers = metrics.subscribers + metrics.unsubscribed;
    const engagement =
      totalUsers > 0 ? Math.round((metrics.subscribers / totalUsers) * 100) : 0;

    return {
      engagementRate: engagement,
      totalReach: totalUsers,
    };
  }, [metrics]);

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-[var(--baladi-border)]">
      <div className="mb-6">
        <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
          Nyhetsbrev Ytelse
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Spor abonnentengasjement og kampanjeeffektivitet
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="bg-[var(--baladi-success)]/5 rounded-lg p-3">
          <div className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-success)]">
            Engasjementsrate
          </div>
          <div className="flex items-center gap-1">
            <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
              {engagementRate}%
            </span>
            <TrendingUp className="h-4 w-4 text-[var(--baladi-success)]" />
          </div>
        </div>
        <div className="bg-[var(--baladi-info)]/5 rounded-lg p-3">
          <div className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-info)]">
            Total Rekkevidde
          </div>
          <div className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
            {totalReach.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Subscribers Card */}
        <div className="group rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white to-[var(--baladi-light)] p-4 transition-all duration-200 hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <div className="bg-[var(--baladi-success)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Users className="h-5 w-5 text-[var(--baladi-success)]" />
            </div>
            <div className="bg-[var(--baladi-success)]/10 rounded-full px-2 py-1">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-success)]">
                Aktiv
              </span>
            </div>
          </div>

          <div className="mb-2">
            <span className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
              <AnimatedCounter value={metrics.subscribers} />
            </span>
          </div>

          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
              Abonnenter
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
              Aktive nyhetsbrev abonnenter
            </p>
          </div>
        </div>

        {/* Unsubscribed Card */}
        <div className="group rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white to-[var(--baladi-light)] p-4 transition-all duration-200 hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <div className="bg-[var(--baladi-error)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <UserX className="h-5 w-5 text-[var(--baladi-error)]" />
            </div>
            <div className="bg-[var(--baladi-error)]/10 rounded-full px-2 py-1">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-error)]">
                Inaktiv
              </span>
            </div>
          </div>

          <div className="mb-2">
            <span className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
              <AnimatedCounter value={metrics.unsubscribed} />
            </span>
          </div>

          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
              Avmeldt
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
              Brukere som meldte seg av
            </p>
          </div>
        </div>

        {/* Campaigns Sent Card */}
        <div className="group rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white to-[var(--baladi-light)] p-4 transition-all duration-200 hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <SendHorizonal className="h-5 w-5 text-[var(--baladi-primary)]" />
            </div>
            <div className="bg-[var(--baladi-primary)]/10 rounded-full px-2 py-1">
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-primary)]">
                Sendt
              </span>
            </div>
          </div>

          <div className="mb-2">
            <span className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
              <AnimatedCounter value={metrics.campaignsSent} />
            </span>
          </div>

          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
              Kampanjer
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
              Totale kampanjer sendt
            </p>
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-6 rounded-lg bg-[var(--baladi-light)] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
              Nyhetsbrev Helsescore
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
              Basert på engasjement og vekstmålinger
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-[var(--baladi-success)] px-3 py-1">
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-bold text-white">
                  Utmerket
                </span>
              </div>
              <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-success)]">
                {engagementRate}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(NewsletterMetrics);
