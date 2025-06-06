import { BarChart3, Trash } from '@repo/ui/lib/icons';

export function CustomerTableHeader() {
  const activeTab = 'all';
  const selectedCustomers = [];
  const handleBulkDelete = () => {};

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center">
        <h2 className="text-foreground mr-3 text-lg font-medium">Customers</h2>
        <div className="flex items-center bg-[var(--color-primary)] px-3 py-1.5 text-xs font-medium text-white">
          <BarChart3 className="mr-1.5 h-3 w-3 text-white" />
          {activeTab === 'all'
            ? 'All Customers'
            : activeTab === 'approved'
              ? 'Approved Customers'
              : activeTab === 'pending'
                ? 'Pending Approval'
                : 'Unverified Email'}
        </div>
      </div>
      {selectedCustomers.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            {selectedCustomers.length} selected
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
