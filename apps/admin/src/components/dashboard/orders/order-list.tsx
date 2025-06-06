'use client';

import { memo, useState } from 'react';

import { OrderTableHeader } from './order-table/order-table-header';
import { OrderStatusTabs } from './order-table/order-status-tabs';
import { OrderTableFilters } from './order-table/order-table-filters';
import { Order } from '@repo/types/order';
import OrderTableContent from './order-table/order-table-content';

function OrderList() {
  const [paginationData, setPaginationData] = useState<{
    startIndex: number;
    endIndex: number;
  }>({ startIndex: 0, endIndex: 0 });
  const [sortedOrders, setSortedOrders] = useState<Order[]>([]);

  return (
    <div className="bg-background shadow-md">
      <div className="p-6">
        <OrderTableHeader />
        <OrderStatusTabs />
      </div>
      <div className="p-4">
        <OrderTableFilters />
        <div className="text-muted-foreground mb-4 text-sm">
          Showing{' '}
          <span className="font-medium">{paginationData.startIndex + 1}</span>{' '}
          to <span className="font-medium">{paginationData.endIndex}</span> of{' '}
          <span className="font-medium">{sortedOrders.length}</span> orders
        </div>
      </div>

      <OrderTableContent />
    </div>
  );
}

export default memo(OrderList);
