'use client';

// Node Modules
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useMemo } from 'react';
import {
  Eye,
  MapPin,
  CheckCircle,
  User,
  Mail,
  Phone,
  Clock,
  XCircle,
  AlertTriangle,
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
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useUsers } from '@/hooks/useUsers';

// Types/Utils
import { cn } from '@repo/ui/lib/utils';
import { UserType } from '@repo/types/user';
import { formatDate } from '@repo/ui/lib/date';

function CustomerTableContent() {
  const { users, approveUserMutation } = useUsers();
  const router = useRouter();
  const { currentPageData } = useMemo(
    () => ({
      currentPageData: users?.users ?? [],
    }),
    [users],
  );

  const handleApproveCustomer = useCallback(
    (customerId: string) => {
      approveUserMutation.mutate({
        userId: customerId,
        userType: UserType.EXTERNAL,
      });
    },
    [approveUserMutation],
  );

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-[var(--baladi-border)]">
      <div className="bg-gradient-to-r from-[var(--baladi-light)] to-white px-8 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
              Kundeoversikt
            </h2>
            <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Administrer dine kunder og overvåk deres status og informasjon
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-[var(--baladi-border)]/30 bg-[var(--baladi-light)]/50 border-b">
              <TableHead className="px-8 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                Kundedetaljer
              </TableHead>
              <TableHead className="px-4 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                Bedriftsinformasjon
              </TableHead>
              <TableHead className="px-4 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                Kontaktinformasjon
              </TableHead>
              <TableHead className="px-4 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                Status
              </TableHead>
              <TableHead className="px-4 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                Registrert
              </TableHead>
              <TableHead className="px-8 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                Handlinger
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.users.map((customer) => (
              <TableRow
                key={customer._id}
                onClick={() =>
                  router.push(`/dashboard/customers/${customer._id}`, {
                    scroll: true,
                  })
                }
                className="border-[var(--baladi-border)]/30 hover:bg-[var(--baladi-light)]/30 group cursor-pointer border-b transition-all duration-200"
              >
                <TableCell className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="ring-[var(--baladi-primary)]/20 group-hover:ring-[var(--baladi-primary)]/40 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)] ring-2 transition-all">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                          customer.isApprovedByAdmin
                            ? 'bg-[var(--baladi-success)]'
                            : 'bg-[var(--baladi-warning)]'
                        }`}
                      ></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
                        {customer.name}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-gray)]">
                          ID: #{customer._id.toUpperCase()}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 transition-all duration-200 hover:scale-105 ${
                            customer.userType === UserType.EXTERNAL
                              ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 ring-blue-600/20'
                              : 'bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-800 ring-purple-600/20'
                          }`}
                        >
                          <div
                            className={cn(
                              'h-1.5 w-1.5 rounded-full',
                              customer.userType === UserType.EXTERNAL
                                ? 'bg-blue-600'
                                : 'bg-purple-600',
                            )}
                          ></div>
                          {customer.userType?.toUpperCase() || 'IKKE BESTEMT'}
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="space-y-2">
                    <div className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
                      {customer.companyName || (
                        <span className="italic text-[var(--baladi-gray)]">
                          Ikke oppgitt
                        </span>
                      )}
                    </div>
                    {customer.organizationNumber && (
                      <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                        Org: {customer.organizationNumber}
                      </div>
                    )}
                    {customer.address && (
                      <div className="flex items-start gap-1.5">
                        <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0 text-[var(--baladi-accent)]" />
                        <span className="line-clamp-2 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                          {customer.address}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[var(--baladi-primary)]" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                          {customer.email}
                        </div>
                        <div className="mt-1">
                          {getEmailVerificationBadge(customer.isEmailVerified)}
                        </div>
                      </div>
                    </div>
                    {customer.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[var(--baladi-secondary)]" />
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                          {customer.phoneNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(
                      customer.isApprovedByAdmin,
                      customer.isEmailVerified,
                    )}
                    {getStatusBadge(
                      customer.isApprovedByAdmin,
                      customer.isEmailVerified,
                    )}
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="space-y-1">
                    <div className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      {formatDate(customer.createdAt, 'MMM d, yyyy')}
                    </div>
                    <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      {new Date(customer.createdAt).toLocaleDateString(
                        'nb-NO',
                        {
                          weekday: 'short',
                        },
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="group/btn hover:bg-[var(--baladi-primary)]/10 rounded-lg p-2 text-[var(--baladi-gray)] transition-all hover:text-[var(--baladi-primary)]"
                      title="Se kundedetaljer"
                    >
                      <Link href={`/dashboard/customers/${customer._id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>

                    {!customer.isApprovedByAdmin && (
                      <Button
                        variant="outline"
                        onClick={() => handleApproveCustomer(customer._id)}
                        disabled={approveUserMutation.isPending}
                        className="group/btn hover:bg-[var(--baladi-success)]/10 rounded-lg p-2 text-[var(--baladi-success)] transition-all hover:text-[var(--baladi-success)] disabled:opacity-50"
                        title="Godkjenn kunde"
                      >
                        {approveUserMutation.isPending ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {currentPageData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--baladi-light)]">
                      <User className="h-8 w-8 text-[var(--baladi-gray)]" />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                        Ingen kunder funnet
                      </div>
                      <div className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                        Prøv å justere søkekriteriene dine
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
  );
}

export default memo(CustomerTableContent);

function getStatusIcon(isApproved: boolean, isEmailVerified: boolean) {
  if (isApproved && isEmailVerified) {
    return <CheckCircle className="h-5 w-5 text-[var(--baladi-success)]" />;
  }
  if (!isEmailVerified) {
    return <XCircle className="h-5 w-5 text-[var(--baladi-error)]" />;
  }
  return <AlertTriangle className="h-5 w-5 text-[var(--baladi-warning)]" />;
}

function getStatusBadge(isApproved: boolean, isEmailVerified: boolean) {
  if (isApproved && isEmailVerified) {
    return (
      <div className="bg-[var(--baladi-success)]/10 ring-[var(--baladi-success)]/20 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--baladi-success)] ring-1">
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--baladi-success)]"></div>
        Fullstendig Verifisert
      </div>
    );
  }
  if (!isEmailVerified) {
    return (
      <div className="bg-[var(--baladi-error)]/10 ring-[var(--baladi-error)]/20 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--baladi-error)] ring-1">
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--baladi-error)]"></div>
        E-post Ikke Verifisert
      </div>
    );
  }
  return (
    <div className="bg-[var(--baladi-warning)]/10 ring-[var(--baladi-warning)]/20 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--baladi-warning)] ring-1">
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--baladi-warning)]"></div>
      Venter på Godkjenning
    </div>
  );
}

function getEmailVerificationBadge(isVerified: boolean) {
  if (isVerified) {
    return (
      <span className="bg-[var(--baladi-success)]/10 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-[var(--baladi-success)]">
        <CheckCircle className="h-3 w-3" />
        Verifisert
      </span>
    );
  }
  return (
    <span className="bg-[var(--baladi-warning)]/10 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-[var(--baladi-warning)]">
      <Clock className="h-3 w-3" />
      Uverifisert
    </span>
  );
}
