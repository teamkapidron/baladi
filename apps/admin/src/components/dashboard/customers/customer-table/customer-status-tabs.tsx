'use client';

// Node Modules
import { cn } from '@repo/ui/lib/utils';
import { memo, useCallback, useMemo } from 'react';
import { Users, UserCheck, Clock, UserX } from '@repo/ui/lib/icons';

// Hooks
import { useUserStats } from '@/hooks/useUsers';

// Types
import { UserStatusFilter } from '@/hooks/useUsers/types';
import { useUserFilter } from '@/hooks/useUsers/useUserFilter';

function CustomerStatusTabs() {
  const getUserStatsQuery = useUserStats();
  const { userFilter, handleUserStatusFilterChange } = useUserFilter();

  const stats = useMemo(() => {
    const data = getUserStatsQuery.data;
    return {
      pendingCount: data?.pendingUsers ?? 0,
      approvedCount: data?.approvedUsers ?? 0,
      unverifiedCount: data?.unverifiedUsers ?? 0,
      totalCount: data?.totalUsers ?? 0,
    };
  }, [getUserStatsQuery.data]);

  const handleTabClick = useCallback(
    (tab: UserStatusFilter) => {
      handleUserStatusFilterChange(tab);
    },
    [handleUserStatusFilterChange],
  );

  return (
    <div className="mb-6 mt-6">
      <div className="flex flex-wrap gap-3 rounded-xl bg-[var(--baladi-light)] p-2">
        <button
          onClick={() => handleTabClick(UserStatusFilter.ALL)}
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-all duration-300',
            userFilter.status === UserStatusFilter.ALL
              ? 'to-[var(--baladi-primary)]/80 bg-gradient-to-r from-[var(--baladi-primary)] text-white shadow-lg'
              : 'text-[var(--baladi-gray)] hover:bg-white hover:text-[var(--baladi-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              userFilter.status === UserStatusFilter.ALL
                ? 'bg-white/20'
                : 'bg-[var(--baladi-primary)]/10 group-hover:bg-[var(--baladi-primary)]/20',
            )}
          >
            <Users
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                userFilter.status === UserStatusFilter.ALL
                  ? 'text-white'
                  : 'text-[var(--baladi-primary)]',
              )}
            />
          </div>
          <span>All Customers</span>
          {stats.totalCount > 0 && (
            <span
              className={cn(
                'ml-1 rounded-full px-2 py-0.5 font-[family-name:var(--font-sora)] text-xs font-bold',
                userFilter.status === UserStatusFilter.ALL
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--baladi-primary)]/10 text-[var(--baladi-primary)]',
              )}
            >
              {stats.totalCount}
            </span>
          )}
        </button>

        <button
          onClick={() => handleTabClick(UserStatusFilter.APPROVED)}
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-all duration-300',
            userFilter.status === UserStatusFilter.APPROVED
              ? 'to-[var(--baladi-success)]/80 bg-gradient-to-r from-[var(--baladi-success)] text-white shadow-lg'
              : 'text-[var(--baladi-gray)] hover:bg-white hover:text-[var(--baladi-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              userFilter.status === UserStatusFilter.APPROVED
                ? 'bg-white/20'
                : 'bg-[var(--baladi-success)]/10 group-hover:bg-[var(--baladi-success)]/20',
            )}
          >
            <UserCheck
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                userFilter.status === UserStatusFilter.APPROVED
                  ? 'text-white'
                  : 'text-[var(--baladi-success)]',
              )}
            />
          </div>
          <span>Approved</span>
          {stats.approvedCount > 0 && (
            <span
              className={cn(
                'ml-1 rounded-full px-2 py-0.5 font-[family-name:var(--font-sora)] text-xs font-bold',
                userFilter.status === UserStatusFilter.APPROVED
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--baladi-success)]/10 text-[var(--baladi-success)]',
              )}
            >
              {stats.approvedCount}
            </span>
          )}
        </button>

        <button
          onClick={() => handleTabClick(UserStatusFilter.PENDING)}
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-all duration-300',
            userFilter.status === UserStatusFilter.PENDING
              ? 'to-[var(--baladi-warning)]/80 bg-gradient-to-r from-[var(--baladi-warning)] text-white shadow-lg'
              : 'text-[var(--baladi-gray)] hover:bg-white hover:text-[var(--baladi-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              userFilter.status === UserStatusFilter.PENDING
                ? 'bg-white/20'
                : 'bg-[var(--baladi-warning)]/10 group-hover:bg-[var(--baladi-warning)]/20',
            )}
          >
            <Clock
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                userFilter.status === UserStatusFilter.PENDING
                  ? 'text-white'
                  : 'text-[var(--baladi-warning)]',
              )}
            />
          </div>
          <span>Pending</span>
          {stats.pendingCount > 0 && (
            <span
              className={cn(
                'ml-1 rounded-full px-2 py-0.5 font-[family-name:var(--font-sora)] text-xs font-bold',
                userFilter.status === UserStatusFilter.PENDING
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--baladi-warning)]/10 text-[var(--baladi-warning)]',
              )}
            >
              {stats.pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => handleTabClick(UserStatusFilter.UNVERIFIED)}
          className={cn(
            'group relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm font-medium transition-all duration-300',
            userFilter.status === UserStatusFilter.UNVERIFIED
              ? 'to-[var(--baladi-error)]/80 bg-gradient-to-r from-[var(--baladi-error)] text-white shadow-lg'
              : 'text-[var(--baladi-gray)] hover:bg-white hover:text-[var(--baladi-dark)] hover:shadow-md',
          )}
        >
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded transition-all duration-300',
              userFilter.status === UserStatusFilter.UNVERIFIED
                ? 'bg-white/20'
                : 'bg-[var(--baladi-error)]/10 group-hover:bg-[var(--baladi-error)]/20',
            )}
          >
            <UserX
              className={cn(
                'h-3.5 w-3.5 transition-colors duration-300',
                userFilter.status === UserStatusFilter.UNVERIFIED
                  ? 'text-white'
                  : 'text-[var(--baladi-error)]',
              )}
            />
          </div>
          <span>Unverified</span>
          {stats.unverifiedCount > 0 && (
            <span
              className={cn(
                'ml-1 rounded-full px-2 py-0.5 font-[family-name:var(--font-sora)] text-xs font-bold',
                userFilter.status === UserStatusFilter.UNVERIFIED
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--baladi-error)]/10 text-[var(--baladi-error)]',
              )}
            >
              {stats.unverifiedCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default memo(CustomerStatusTabs);
