'use client';

// Node Modules
import { cn } from '@repo/ui/lib/utils';
import { memo, useCallback } from 'react';

// Hooks
import { useUsers } from '@/hooks/useUsers';

// Types
import { UserStatusFilter } from '@/hooks/useUsers/types';

function CustomerStatusTabs() {
  const { userStatusFilter, setUserStatusFilter, getUserStatsQuery } =
    useUsers();

  const pendingCount = getUserStatsQuery.data?.pendingUsers ?? 0;

  const handleTabClick = useCallback(
    (tab: UserStatusFilter) => {
      setUserStatusFilter(tab);
    },
    [setUserStatusFilter],
  );

  return (
    <div className="border-border no-scrollbar mt-5 flex gap-1 overflow-x-auto border-b">
      <button
        onClick={() => handleTabClick(UserStatusFilter.ALL)}
        className={cn(
          '-mb-px flex cursor-pointer items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors',
          userStatusFilter === UserStatusFilter.ALL
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent',
        )}
      >
        All Customers
      </button>
      <button
        onClick={() => handleTabClick(UserStatusFilter.APPROVED)}
        className={cn(
          '-mb-px flex cursor-pointer items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors',
          userStatusFilter === UserStatusFilter.APPROVED
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent',
        )}
      >
        Approved
      </button>
      <button
        onClick={() => handleTabClick(UserStatusFilter.PENDING)}
        className={cn(
          '-mb-px flex cursor-pointer items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors',
          userStatusFilter === UserStatusFilter.PENDING
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent',
        )}
      >
        Pending Approval {pendingCount > 0 && `(${pendingCount})`}
      </button>
      <button
        onClick={() => handleTabClick(UserStatusFilter.UNVERIFIED)}
        className={cn(
          '-mb-px flex cursor-pointer items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors',
          userStatusFilter === UserStatusFilter.UNVERIFIED
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent',
        )}
      >
        Unverified Email
      </button>
    </div>
  );
}

export default memo(CustomerStatusTabs);
