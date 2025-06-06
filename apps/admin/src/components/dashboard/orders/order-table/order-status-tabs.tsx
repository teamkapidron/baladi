import { useState } from 'react';

export function OrderStatusTabs() {
  const [activeTab, setActiveTab] = useState<string>('all');

  return (
    <div className="border-border no-scrollbar mt-5 flex gap-1 overflow-x-auto border-b">
      <button
        onClick={() => setActiveTab('all')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'all'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        All Orders
      </button>
      <button
        onClick={() => setActiveTab('pending')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'pending'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => setActiveTab('confirmed')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'confirmed'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        Confirmed
      </button>
      <button
        onClick={() => setActiveTab('shipped')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'shipped'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        Shipped
      </button>
      <button
        onClick={() => setActiveTab('delivered')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'delivered'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        Delivered
      </button>
      <button
        onClick={() => setActiveTab('cancelled')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'cancelled'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        Cancelled
      </button>
    </div>
  );
}
