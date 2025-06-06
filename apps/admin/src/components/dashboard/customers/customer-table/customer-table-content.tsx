import {
  ArrowUpDown,
  Eye,
  MapPin,
  Trash,
  CheckCircle,
  CircleX,
  User,
} from '@repo/ui/lib/icons';
import { User as CustomerType } from '@repo/types/user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';

// Format date consistently to avoid hydration errors
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export function CustomerTableContent() {
  const currentPageData: CustomerType[] = [];
  const sortedCustomers: CustomerType[] = [];
  const selectedCustomers: string[] = [];
  const sortConfig = {
    key: null,
    direction: null,
  };
  const handleSort = (key: keyof CustomerType) => {};
  const toggleSelectAll = () => {};
  const toggleCustomerSelection = (customerId: string) => {};
  const handleDeleteClick = (customerId: string, customerName: string) => {};
  const handleApproveCustomer = (customerId: string) => {};
  const handleRejectCustomer = (customerId: string) => {};
  const actionLoading = { approving: [], rejecting: [] };

  return (
    <div className="relative">
      <div className="max-h-[600px] overflow-auto">
        <Table className="w-full border-none">
          <TableHeader className="border-none">
            <TableRow className="border-none">
              <TableHead className="bg-background sticky top-0 z-50 w-10 border-none p-3 text-left">
                <input
                  type="checkbox"
                  className="border-input bg-background h-4 w-4 cursor-pointer"
                  checked={
                    selectedCustomers.length === sortedCustomers.length &&
                    sortedCustomers.length > 0
                  }
                  onChange={toggleSelectAll}
                  title="Select all customers"
                  aria-label="Select all customers"
                />
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                <button
                  onClick={() => handleSort('name')}
                  className="hover:text-foreground flex items-center gap-1"
                  title="Sort by customer name"
                >
                  Customer
                  <ArrowUpDown
                    className={`h-3.5 w-3.5 ${
                      sortConfig.key === 'name'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                <button
                  onClick={() => handleSort('companyName')}
                  className="hover:text-foreground flex items-center gap-1"
                  title="Sort by company"
                >
                  Company & Address
                  <ArrowUpDown
                    className={`h-3.5 w-3.5 ${
                      sortConfig.key === 'companyName'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                <button
                  onClick={() => handleSort('email')}
                  className="hover:text-foreground flex items-center gap-1"
                  title="Sort by email"
                >
                  Contact Info
                  <ArrowUpDown
                    className={`h-3.5 w-3.5 ${
                      sortConfig.key === 'email'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                <button
                  onClick={() => handleSort('isApprovedByAdmin')}
                  className="hover:text-foreground flex items-center gap-1"
                  title="Sort by status"
                >
                  Status
                  <ArrowUpDown
                    className={`h-3.5 w-3.5 ${
                      sortConfig.key === 'isApprovedByAdmin'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                <button
                  onClick={() => handleSort('userType')}
                  className="hover:text-foreground flex items-center gap-1"
                  title="Sort by type"
                >
                  User Type
                  <ArrowUpDown
                    className={`h-3.5 w-3.5 ${
                      sortConfig.key === 'userType'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="hover:text-foreground flex items-center gap-1"
                  title="Sort by date"
                >
                  Created At
                  <ArrowUpDown
                    className={`h-3.5 w-3.5 ${
                      sortConfig.key === 'createdAt'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-none">
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
                  className={`${isSelected ? 'selected' : ''} border-none`}
                >
                  <TableCell className="border-none p-3">
                    <input
                      type="checkbox"
                      className="border-input bg-background h-4 w-4 cursor-pointer"
                      checked={isSelected}
                      onChange={() => toggleCustomerSelection(customer._id)}
                      title={`Select ${customer.name}`}
                      aria-label={`Select ${customer.name}`}
                    />
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
                        <User className="text-muted-foreground h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-foreground font-medium">
                          {customer.name}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          ID: {customer._id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="text-foreground font-medium">
                      {customer.companyName || 'N/A'}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Org#: {customer.organizationNumber || 'N/A'}
                    </div>
                    <div className="text-muted-foreground mt-1 flex items-center text-xs">
                      <MapPin className="mr-1 h-3 w-3" />
                      {customer.address || 'No address provided'}
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="font-medium">
                      {customer.email}
                      {customer.isEmailVerified ? (
                        <span className="bg-[var(--color-success)]/10 ml-2 px-1.5 py-0.5 text-xs text-[var(--color-success)]">
                          Verified
                        </span>
                      ) : (
                        <span className="ml-2 bg-amber-500/10 px-1.5 py-0.5 text-xs text-amber-600">
                          Unverified
                        </span>
                      )}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Tel: {customer.phoneNumber || 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ${
                        customer.isApprovedByAdmin
                          ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                          : 'bg-amber-500/10 text-amber-600'
                      }`}
                    >
                      {customer.isApprovedByAdmin ? 'Approved' : 'Pending'}
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="bg-primary/10 text-primary inline-flex items-center px-2.5 py-0.5 text-xs font-medium">
                      {customer.userType || 'External'}
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="text-muted-foreground text-sm">
                      {formatDate(customer.createdAt.toISOString())}
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="flex items-center space-x-2">
                      <a
                        href={`/dashboard/customers/${customer._id}`}
                        className="text-muted-foreground hover:text-foreground p-1"
                        title="View Customer"
                      >
                        <Eye className="h-4 w-4" />
                      </a>
                      {!customer.isApprovedByAdmin && (
                        <>
                          <button
                            className="hover:text-[var(--color-success)]/80 p-1 text-[var(--color-success)]"
                            title="Approve Customer"
                            onClick={() => handleApproveCustomer(customer._id)}
                            disabled={isApproving || isRejecting}
                          >
                            {isApproving ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-success)] border-t-transparent" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            className="text-destructive hover:text-destructive/80 p-1"
                            title="Reject Customer"
                            onClick={() => handleRejectCustomer(customer._id)}
                            disabled={isApproving || isRejecting}
                          >
                            {isRejecting ? (
                              <div className="border-destructive h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                            ) : (
                              <CircleX className="h-4 w-4" />
                            )}
                          </button>
                        </>
                      )}
                      <button
                        className="text-destructive hover:text-destructive/80 p-1"
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
                <TableCell colSpan={8} className="h-24 border-none text-center">
                  No customers found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
