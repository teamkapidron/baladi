'use client';

// Node Modules
import { memo, useMemo } from 'react';
import {
  Eye,
  MapPin,
  Trash,
  CheckCircle,
  CircleX,
  User,
} from '@repo/ui/lib/icons';

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';

// Hooks
import { useUsers } from '@/hooks/useUsers';

function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return dateObj.toLocaleDateString('en-US', options);
}

function CustomerTableContent() {
  const { users } = useUsers();

  const { currentPageData, sortedCustomers, selectedCustomers } =
    useMemo(() => {
      return {
        currentPageData: users?.users ?? [],
        sortedCustomers: users?.users ?? [],
        selectedCustomers: [] as string[],
      };
    }, [users]);

  const toggleSelectAll = () => {};
  const toggleCustomerSelection = (customerId: string) => {
    console.log(customerId);
  };
  const handleDeleteClick = (customerId: string, customerName: string) => {
    console.log(customerId, customerName);
  };
  const handleApproveCustomer = (customerId: string) => {
    console.log(customerId);
  };
  const handleRejectCustomer = (customerId: string) => {
    console.log(customerId);
  };
  const actionLoading = { approving: [], rejecting: [] };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
        <div className="max-h-[700px] overflow-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-[var(--baladi-border)] bg-[var(--baladi-light)]">
                <TableHead className="sticky top-0 z-50 w-12 bg-[var(--baladi-light)] p-4 text-left">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="focus:ring-[var(--baladi-primary)]/20 h-4 w-4 cursor-pointer rounded border-[var(--baladi-border)] text-[var(--baladi-primary)] transition-colors duration-200 focus:ring-2"
                      checked={
                        selectedCustomers.length === sortedCustomers.length &&
                        sortedCustomers.length > 0
                      }
                      onChange={toggleSelectAll}
                      title="Select all customers"
                    />
                  </div>
                </TableHead>
                <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold">
                  Customer
                </TableHead>
                <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold">
                  Company & Address
                </TableHead>
                <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left">
                  Contact Info
                </TableHead>
                <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left">
                  Status
                </TableHead>
                <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left">
                  User Type
                </TableHead>
                <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-left">
                  Created At
                </TableHead>
                <TableHead className="sticky top-0 z-50 bg-[var(--baladi-light)] p-4 text-center font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPageData.map((customer) => {
                const isSelected = selectedCustomers.includes(customer._id);
                const isApproving = actionLoading.approving.includes(
                  customer._id as never,
                );
                const isRejecting = actionLoading.rejecting.includes(
                  customer._id as never,
                );

                return (
                  <TableRow
                    key={customer._id}
                    className={`border-[var(--baladi-border)]/50 hover:bg-[var(--baladi-light)]/30 group border-b transition-all duration-200 ${
                      isSelected
                        ? 'bg-[var(--baladi-primary)]/5 hover:bg-[var(--baladi-primary)]/10'
                        : ''
                    }`}
                  >
                    <TableCell className="p-4">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="focus:ring-[var(--baladi-primary)]/20 h-4 w-4 cursor-pointer rounded border-[var(--baladi-border)] text-[var(--baladi-primary)] transition-colors duration-200 focus:ring-2"
                          checked={isSelected}
                          onChange={() => toggleCustomerSelection(customer._id)}
                          title={`Select ${customer.name}`}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="to-[var(--baladi-primary)]/80 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--baladi-primary)] shadow-sm">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                            {customer.name}
                          </div>
                          <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                            ID: {customer._id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div>
                        <div className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                          {customer.companyName || 'N/A'}
                        </div>
                        <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                          Org#: {customer.organizationNumber || 'N/A'}
                        </div>
                        <div className="mt-2 flex items-center font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                          <MapPin className="mr-1.5 h-3 w-3" />
                          {customer.address || 'No address provided'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div>
                        <div className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                          {customer.email}
                          {customer.isEmailVerified ? (
                            <span className="bg-[var(--baladi-success)]/10 ml-2 rounded-full px-2 py-0.5 font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-success)]">
                              Verified
                            </span>
                          ) : (
                            <span className="bg-[var(--baladi-warning)]/10 ml-2 rounded-full px-2 py-0.5 font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-warning)]">
                              Unverified
                            </span>
                          )}
                        </div>
                        <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                          Tel: {customer.phoneNumber || 'N/A'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 font-[family-name:var(--font-dm-sans)] text-xs font-medium ${
                          customer.isApprovedByAdmin
                            ? 'bg-[var(--baladi-success)]/10 text-[var(--baladi-success)]'
                            : 'bg-[var(--baladi-warning)]/10 text-[var(--baladi-warning)]'
                        }`}
                      >
                        {customer.isApprovedByAdmin ? 'Approved' : 'Pending'}
                      </span>
                    </TableCell>
                    <TableCell className="p-4">
                      <span className="bg-[var(--baladi-primary)]/10 inline-flex items-center rounded-full px-3 py-1 font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-primary)]">
                        {customer.userType || 'External'}
                      </span>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        {formatDate(customer.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center justify-center space-x-1">
                        <a
                          href={`/dashboard/customers/${customer._id}`}
                          className="group flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--baladi-border)] bg-white text-[var(--baladi-gray)] transition-all duration-200 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white"
                          title="View Customer"
                        >
                          <Eye className="h-4 w-4" />
                        </a>
                        {!customer.isApprovedByAdmin && (
                          <>
                            <button
                              className="border-[var(--baladi-success)]/20 bg-[var(--baladi-success)]/5 group flex h-8 w-8 items-center justify-center rounded-lg border text-[var(--baladi-success)] transition-all duration-200 hover:border-[var(--baladi-success)] hover:bg-[var(--baladi-success)] hover:text-white disabled:opacity-50"
                              title="Approve Customer"
                              onClick={() =>
                                handleApproveCustomer(customer._id)
                              }
                              disabled={isApproving || isRejecting}
                            >
                              {isApproving ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              ) : (
                                <CheckCircle className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              className="border-[var(--baladi-error)]/20 bg-[var(--baladi-error)]/5 group flex h-8 w-8 items-center justify-center rounded-lg border text-[var(--baladi-error)] transition-all duration-200 hover:border-[var(--baladi-error)] hover:bg-[var(--baladi-error)] hover:text-white disabled:opacity-50"
                              title="Reject Customer"
                              onClick={() => handleRejectCustomer(customer._id)}
                              disabled={isApproving || isRejecting}
                            >
                              {isRejecting ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              ) : (
                                <CircleX className="h-4 w-4" />
                              )}
                            </button>
                          </>
                        )}
                        <button
                          className="border-[var(--baladi-error)]/20 bg-[var(--baladi-error)]/5 group flex h-8 w-8 items-center justify-center rounded-lg border text-[var(--baladi-error)] transition-all duration-200 hover:border-[var(--baladi-error)] hover:bg-[var(--baladi-error)] hover:text-white"
                          title="Delete Customer"
                          onClick={() =>
                            handleDeleteClick(customer._id, customer.name)
                          }
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

              {currentPageData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--baladi-light)]">
                        <User className="h-8 w-8 text-[var(--baladi-gray)]" />
                      </div>
                      <div>
                        <div className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                          No customers found
                        </div>
                        <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                          Try adjusting your search criteria
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomerTableContent);
