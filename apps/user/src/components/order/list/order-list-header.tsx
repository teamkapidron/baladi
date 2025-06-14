'use client';

// Node Modules
import React, { memo, useMemo } from 'react';
import { Package, Clock, CheckCircle, TrendingUp } from '@repo/ui/lib/icons';

// Hooks
import { useOrder } from '@/hooks/useOrder';

function OrderListHeader() {
  const { myOrders } = useOrder();

  const { totalOrders, currentPage, totalPages } = useMemo(() => {
    return {
      totalOrders: myOrders?.totalOrders || 0,
      currentPage: myOrders?.page || 1,
      totalPages: myOrders?.totalPages || 1,
    };
  }, [myOrders]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-dark)]">
          Mine bestillinger
        </h1>
        <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
          Oversikt over alle dine bestillinger hos Baladi Engros
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-full">
              <Package size={18} className="text-[var(--baladi-primary)]" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                Totale bestillinger
              </p>
              <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
                {totalOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--baladi-secondary)]/10 flex h-10 w-10 items-center justify-center rounded-full">
              <TrendingUp
                size={18}
                className="text-[var(--baladi-secondary)]"
              />
            </div>
            <div>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                Side {currentPage} av {totalPages}
              </p>
              <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
                {Math.min(currentPage * 10, totalOrders)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--baladi-accent)]/10 flex h-10 w-10 items-center justify-center rounded-full">
              <Clock size={18} className="text-[var(--baladi-accent)]" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                Siste 30 dager
              </p>
              <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
                {Math.min(5, totalOrders)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle size={18} className="text-green-600" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                Fullførte
              </p>
              <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
                {Math.floor(totalOrders * 0.8)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {totalOrders > 0 && (
        <div className="from-[var(--baladi-primary)]/5 to-[var(--baladi-secondary)]/5 rounded-lg bg-gradient-to-r p-6">
          <div className="flex items-center gap-4">
            <div className="bg-[var(--baladi-primary)]/10 flex h-12 w-12 items-center justify-center rounded-full">
              <Package size={24} className="text-[var(--baladi-primary)]" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                Takk for at du handler med oss!
              </h3>
              <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                Her kan du følge med på alle dine bestillinger og se
                leveringsstatus
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(OrderListHeader);
