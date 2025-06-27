'use client';

// Node Modules
import { memo, useMemo } from 'react';

// Icons
import { DollarSign, TrendingUp, TrashIcon } from '@repo/ui/lib/icons';

// Components
import AnimatedCounter from '@repo/ui/components/base/animate-counter';

// Hooks
import { useCategory } from '@/hooks/useCategory';

// Types/Utils
import { formatPrice } from '@/utils/price.util';
import { SelectedCategory } from './categories-header';

function CategoryMetricCards({
  selectedCategory,
}: {
  selectedCategory: SelectedCategory;
}) {
  const {
    _id,
    categoryName,
    totalRevenue,
    grossProfit,
    totalWastageQuantity,
    totalWastageAmount,
  } = selectedCategory;

  const profitMargin = useMemo(() => {
    return totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
  }, [totalRevenue, grossProfit]);

  const wastagePercentage = useMemo(() => {
    return totalRevenue > 0 ? (totalWastageAmount / totalRevenue) * 100 : 0;
  }, [totalRevenue, totalWastageAmount]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-text)]">
          Kategori Oversikt: {categoryName}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Total Revenue Card */}
        <div className="to-[var(--baladi-success)]/5 hover:shadow-[var(--baladi-success)]/20 group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="bg-[var(--baladi-success)]/10 absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-110"></div>

          <div className="relative flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--baladi-success)] shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-text-muted)]">
                  Total Omsetning
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-text)]">
                    <AnimatedCounter value={formatPrice(totalRevenue)} />
                    kr
                  </span>
                  {totalRevenue > 0 && (
                    <div className="bg-[var(--baladi-success)]/10 flex items-center gap-1 rounded-full px-2 py-1">
                      <TrendingUp className="h-3 w-3 text-[var(--baladi-success)]" />
                      <span className="text-xs font-medium text-[var(--baladi-success)]">
                        Aktiv
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
                Omsetningsandel
              </span>
              <span className="font-medium text-[var(--baladi-success)]">
                100%
              </span>
            </div>
          </div>
        </div>

        {/* Gross Profit Card */}
        <div className="to-[var(--baladi-primary)]/5 hover:shadow-[var(--baladi-primary)]/20 group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="bg-[var(--baladi-primary)]/10 absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-110"></div>

          <div className="relative flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--baladi-primary)] shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-text-muted)]">
                  Bruttofortjeneste
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-text)]">
                    <AnimatedCounter value={formatPrice(grossProfit)} />
                    kr
                  </span>
                  {profitMargin > 0 && (
                    <div className="bg-[var(--baladi-primary)]/10 flex items-center gap-1 rounded-full px-2 py-1">
                      <span className="text-xs font-medium text-[var(--baladi-primary)]">
                        {profitMargin.toFixed(1)}%
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
                Fortjenestemargin
              </span>
              <span className="font-medium text-[var(--baladi-primary)]">
                {profitMargin.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Wastage Card */}
        <div className="to-[var(--baladi-error)]/5 hover:shadow-[var(--baladi-error)]/20 group relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="bg-[var(--baladi-error)]/10 absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-300 group-hover:scale-110"></div>

          <div className="relative flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--baladi-error)] shadow-lg">
                <TrashIcon className="h-6 w-6 text-white" />
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-text-muted)]">
                  Totalt Svinn
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-text)]">
                    <AnimatedCounter value={formatPrice(totalWastageAmount)} />
                    kr
                  </span>
                  {wastagePercentage > 0 && (
                    <div className="bg-[var(--baladi-error)]/10 flex items-center gap-1 rounded-full px-2 py-1">
                      <span className="text-xs font-medium text-[var(--baladi-error)]">
                        {wastagePercentage.toFixed(1)}%
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
                Antall produkter
              </span>
              <span className="font-medium text-[var(--baladi-error)]">
                {totalWastageQuantity} stk
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CategoryMetricCards);
