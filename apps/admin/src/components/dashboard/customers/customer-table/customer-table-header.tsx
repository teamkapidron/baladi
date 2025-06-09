// Node Modules
import { memo, useMemo } from 'react';
import { BarChart3, Trash } from '@repo/ui/lib/icons';

// Hooks
import { useUsers } from '@/hooks/useUsers';

// Types
import { UserStatusFilter } from '@/hooks/useUsers/types';

function CustomerTableHeader() {
  const { userFilter } = useUsers();

  const label = useMemo(() => {
    if (userFilter.status === UserStatusFilter.ALL) return 'All Customers';
    if (userFilter.status === UserStatusFilter.APPROVED)
      return 'Approved Customers';
    if (userFilter.status === UserStatusFilter.PENDING)
      return 'Pending Approval';
    if (userFilter.status === UserStatusFilter.UNVERIFIED)
      return 'Unverified Email';
  }, [userFilter]);

  const selectedCustomers = [];
  const handleBulkDelete = () => {};

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
            Customers
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Manage your customer database
          </p>
        </div>
        <div className="to-[var(--baladi-primary)]/80 relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--baladi-primary)] px-4 py-2.5 shadow-lg">
          <div className="absolute inset-0 bg-white/10"></div>
          <div className="relative flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <BarChart3 className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-white">
              {label}
            </span>
          </div>
        </div>
      </div>

      {selectedCustomers.length > 0 && (
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-[var(--baladi-light)] px-3 py-2">
            <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
              {selectedCustomers.length} customer
              {selectedCustomers.length > 1 ? 's' : ''} selected
            </span>
          </div>
          <button
            className="border-[var(--baladi-error)]/30 from-[var(--baladi-error)]/5 to-[var(--baladi-error)]/10 group relative overflow-hidden rounded-lg border bg-gradient-to-r px-4 py-2.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            onClick={handleBulkDelete}
          >
            <div className="bg-[var(--baladi-error)]/5 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative flex items-center gap-2">
              <div className="bg-[var(--baladi-error)]/10 group-hover:bg-[var(--baladi-error)]/20 flex h-5 w-5 items-center justify-center rounded transition-all duration-300">
                <Trash className="h-3.5 w-3.5 text-[var(--baladi-error)]" />
              </div>
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-error)]">
                Delete Selected
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(CustomerTableHeader);
