import { useState } from 'react';
import { ShoppingBag, Trash } from '@repo/ui/lib/icons';

export function OrderTableHeader() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const handleBulkDelete = () => {
    console.log('Bulk delete');
  };

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center">
        <h2 className="text-foreground mr-3 text-lg font-medium">Orders</h2>
        <div className="flex items-center bg-[var(--color-primary)] px-3 py-1.5 text-xs font-medium text-white">
          <ShoppingBag className="mr-1.5 h-3 w-3 text-white" />
          {activeTab === 'all'
            ? 'All Orders'
            : activeTab === 'pending'
              ? 'Pending Orders'
              : activeTab === 'confirmed'
                ? 'Confirmed Orders'
                : activeTab === 'shipped'
                  ? 'Shipped Orders'
                  : activeTab === 'delivered'
                    ? 'Delivered Orders'
                    : 'Cancelled Orders'}
        </div>
      </div>
      {selectedOrders.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            {selectedOrders.length} selected
          </span>
          <button
            className="border-destructive text-destructive hover:bg-destructive/10 inline-flex h-8 items-center justify-center rounded-none border px-3 text-sm"
            onClick={handleBulkDelete}
          >
            <Trash className="mr-1.5 h-3.5 w-3.5" />
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
}
