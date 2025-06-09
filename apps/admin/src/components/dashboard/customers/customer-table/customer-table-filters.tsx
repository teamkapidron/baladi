'use client';

// Node Modules
import { memo, useState, useCallback } from 'react';
import {
  ChevronDown,
  Search,
  Filter,
  Users,
  Mail,
  User,
} from '@repo/ui/lib/icons';

// Components
import { Input } from '@repo/ui/components/base/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';

// Hooks
import { useUsers } from '@/hooks/useUsers';

// Types
import { UserType } from '@repo/types/user';
import { UserFilter } from '@/hooks/useUsers/useUserFilter';

function CustomerTableFilters() {
  const {
    userFilter,
    handleUserEmailFilterChange,
    handleUserNameFilterChange,
    handleUserTypeFilterChange,
    page,
    limit,
    handlePageSizeChange,
    handlePageChange,
    users,
  } = useUsers();

  const [filter, setFilter] = useState<UserFilter>(UserFilter.NAME);
  const [searchQuery, setSearchQuery] = useState('');

  const currentPage = Number(page);
  const pageSize = Number(limit);
  const totalPages = users?.totalPages || 1;

  const [pageInput, setPageInput] = useState<string>(currentPage.toString());

  const handleSearchQueryChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      if (filter === UserFilter.NAME) {
        handleUserNameFilterChange(value);
      } else if (filter === UserFilter.EMAIL) {
        handleUserEmailFilterChange(value);
      }
    },
    [filter, handleUserNameFilterChange, handleUserEmailFilterChange],
  );

  const handleFilterChange = useCallback(
    (newFilter: UserFilter) => {
      setFilter(newFilter);
      setSearchQuery('');
      if (filter === UserFilter.NAME) {
        handleUserNameFilterChange('');
      } else if (filter === UserFilter.EMAIL) {
        handleUserEmailFilterChange('');
      }
    },
    [filter, handleUserNameFilterChange, handleUserEmailFilterChange],
  );

  const handleUserTypeChange = useCallback(
    (userType: string) => {
      if (userType === 'all') {
        handleUserTypeFilterChange(undefined as any);
      } else {
        handleUserTypeFilterChange(userType as UserType);
      }
    },
    [handleUserTypeFilterChange],
  );

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      handlePageChange(page);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  const getFilterLabel = (filterType: UserFilter) => {
    switch (filterType) {
      case UserFilter.NAME:
        return 'Name';
      case UserFilter.EMAIL:
        return 'Email';
      case UserFilter.USER_TYPE:
        return 'User Type';
      default:
        return 'Name';
    }
  };

  const getCurrentFilterValue = () => {
    switch (filter) {
      case UserFilter.NAME:
        return userFilter.name || '';
      case UserFilter.EMAIL:
        return userFilter.email || '';
      case UserFilter.USER_TYPE:
        return userFilter.userType || 'all';
      default:
        return '';
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Filter Selection */}
          <div className="flex items-center gap-2">
            <div className="bg-[var(--baladi-primary)]/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <Filter className="h-4 w-4 text-[var(--baladi-primary)]" />
            </div>
            <Select
              value={filter}
              onValueChange={(value) => handleFilterChange(value as UserFilter)}
            >
              <SelectTrigger className="w-32 font-[family-name:var(--font-dm-sans)] text-sm">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserFilter.NAME}>Name</SelectItem>
                <SelectItem value={UserFilter.EMAIL}>Email</SelectItem>
                <SelectItem value={UserFilter.USER_TYPE}>User Type</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Conditional Input/Select based on filter */}
          <div className="relative">
            {filter === UserFilter.USER_TYPE ? (
              <Select
                value={getCurrentFilterValue()}
                onValueChange={handleUserTypeChange}
              >
                <SelectTrigger className="w-48 font-[family-name:var(--font-dm-sans)] text-sm">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value={UserType.INTERNAL}>Internal</SelectItem>
                  <SelectItem value={UserType.EXTERNAL}>External</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                <Input
                  type="text"
                  placeholder={`Search by ${getFilterLabel(filter).toLowerCase()}...`}
                  className="w-48 pl-9 pr-4 font-[family-name:var(--font-dm-sans)] text-sm"
                  value={getCurrentFilterValue()}
                  onChange={(e) => handleSearchQueryChange(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-4">
          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-gray)]">
              Show:
            </span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => handlePageSizeChange(Number(value))}
            >
              <SelectTrigger className="w-20 font-[family-name:var(--font-dm-sans)] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--baladi-border)] bg-white transition-all duration-300 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-[var(--baladi-gray)]"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                title="Previous page"
              >
                <ChevronDown className="h-4 w-4 rotate-90" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;

                if (pageNum === 1) {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => handlePageChange(Number(pageNum))}
                    className={`h-8 min-w-8 rounded-lg px-3 font-[family-name:var(--font-sora)] text-sm font-medium transition-all duration-300 ${
                      pageNum === currentPage
                        ? 'bg-[var(--baladi-primary)] text-white shadow-md'
                        : 'border border-[var(--baladi-border)] bg-white text-[var(--baladi-dark)] hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white'
                    }`}
                    title={`Page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && (
                <form
                  onSubmit={handlePageInputSubmit}
                  className="ml-1 flex items-center gap-1"
                >
                  <input
                    type="text"
                    value={pageInput}
                    onChange={handlePageInputChange}
                    className="hover:border-[var(--baladi-primary)]/50 focus:ring-[var(--baladi-primary)]/20 h-8 w-12 rounded-lg border border-[var(--baladi-border)] bg-white px-2 text-center font-[family-name:var(--font-dm-sans)] text-sm shadow-sm transition-all duration-300 focus:border-[var(--baladi-primary)] focus:outline-none focus:ring-2"
                    placeholder="Go"
                  />
                  <button
                    type="submit"
                    className="h-8 rounded-lg border border-[var(--baladi-border)] bg-white px-2 font-[family-name:var(--font-dm-sans)] text-xs font-medium transition-all duration-300 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white"
                  >
                    Go
                  </button>
                </form>
              )}

              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--baladi-border)] bg-white transition-all duration-300 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-[var(--baladi-gray)]"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                title="Next page"
              >
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      {users && (
        <div className="flex items-center justify-between rounded-lg bg-[var(--baladi-light)] px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="bg-[var(--baladi-primary)]/10 flex h-6 w-6 items-center justify-center rounded">
              <Users className="h-3.5 w-3.5 text-[var(--baladi-primary)]" />
            </div>
            <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Showing {(currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, users.totalRecords)} of{' '}
              {users.totalRecords} customers
            </span>
          </div>
          {totalPages > 1 && (
            <span className="font-[family-name:var(--font-sora)] text-sm font-medium text-[var(--baladi-dark)]">
              Page {currentPage} of {totalPages}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(CustomerTableFilters);
