'use client';

import Link from 'next/link';
import React, { memo, useState } from 'react';
import { Plus, Search } from '@repo/ui/lib/icons';

// Components
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';
import OrderListHeader from './order-list-header';
import OrderCard from './order-card';
import EmptyOrderState from '../detail/empty-order-state';
import OrderListSkeleton from './order-skeleton';

// Hooks
import { useOrder } from '@/hooks/useOrder';

function OrderListContent() {
  const { myOrders, isMyOrdersLoading } = useOrder();
  const [searchQuery, setSearchQuery] = useState('');

  if (isMyOrdersLoading) {
    return <OrderListSkeleton />;
  }

  if (!myOrders?.orders || myOrders.orders.length === 0) {
    return <EmptyOrderState />;
  }

  return (
    <div className="space-y-8">
      <OrderListHeader />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md flex-1">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--baladi-gray)]"
            />
            <Input
              placeholder="Søk etter bestilling eller produktnavn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {myOrders.orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>

      <div className="from-[var(--baladi-light)]/50 to-[var(--baladi-primary)]/5 mt-12 rounded-lg bg-gradient-to-r p-6 text-center">
        <div className="bg-[var(--baladi-primary)]/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <Plus size={24} className="text-[var(--baladi-primary)]" />
        </div>
        <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
          Trenger du mer?
        </h3>
        <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
          Utforsk vårt store utvalg av kvalitetsprodukter for din virksomhet
        </p>
        <Button className="mt-4">
          <Link href="/">
            <Plus size={16} className="mr-2" />
            Fortsett å handle
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default memo(OrderListContent);
