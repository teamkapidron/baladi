'use client';

// Node Modules
import React, { memo, useCallback, useMemo } from 'react';
import { format } from '@repo/ui/lib/date';
import {
  Calendar,
  Package,
  Percent,
  MoreHorizontal,
  ToggleLeft,
  ToggleRight,
} from '@repo/ui/lib/icons';

// Components
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/base/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';

// Hooks
import { useDiscount } from '@/hooks/useDiscount';

// Types
import type { Discount } from '@repo/types/discount';

function DiscountsTable() {
  const { discounts: data, makeDiscountInactiveMutation } = useDiscount();

  const discounts = useMemo(() => data?.discounts || [], [data?.discounts]);

  const handleToggleActive = useCallback(
    (discountId: string) => {
      makeDiscountInactiveMutation.mutate({ discountId });
    },
    [makeDiscountInactiveMutation],
  );

  if (discounts.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <div className="bg-[var(--baladi-primary)]/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Percent className="h-8 w-8 text-[var(--baladi-primary)]" />
            </div>
            <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-text)]">
              No discounts found
            </h3>
            <p className="mt-2 text-sm text-[var(--baladi-gray)]">
              Create your first discount to start offering promotions to
              customers.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
      <div className="overflow-hidden rounded-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-[var(--baladi-border)] bg-[var(--baladi-surface)]">
              <TableHead className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-text)]">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Product ID
                </div>
              </TableHead>
              <TableHead className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-text)]">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Discount
                </div>
              </TableHead>
              <TableHead className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-text)]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Valid Period
                </div>
              </TableHead>
              <TableHead className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-text)]">
                Status
              </TableHead>
              <TableHead className="w-[100px] font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-text)]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discounts.map((discount) => {
              const status = getDiscountStatus(discount);

              return (
                <TableRow
                  key={`${discount.productId}-${discount.createdAt}`}
                  className="hover:bg-[var(--baladi-surface)]/50 border-[var(--baladi-border)]"
                >
                  <TableCell className="font-mono text-sm">
                    <div className="truncate font-medium text-[var(--baladi-text)]">
                      {discount.productId}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-[var(--baladi-primary)]">
                        {discount.discountValue}%
                      </span>
                      <span className="text-sm text-[var(--baladi-gray)]">
                        off
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      {discount.validFrom && (
                        <div className="text-[var(--baladi-text)]">
                          From:{' '}
                          {format(new Date(discount.validFrom), 'MMM dd, yyyy')}
                        </div>
                      )}
                      {discount.validTo && (
                        <div className="text-[var(--baladi-text)]">
                          To:{' '}
                          {format(new Date(discount.validTo), 'MMM dd, yyyy')}
                        </div>
                      )}
                      {!discount.validFrom && !discount.validTo && (
                        <div className="text-[var(--baladi-gray)]">
                          No time limit
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleToggleActive(discount.productId)}
                          className="cursor-pointer"
                        >
                          {discount.isActive ? (
                            <>
                              <ToggleLeft className="mr-2 h-4 w-4" />
                              Make Inactive
                            </>
                          ) : (
                            <>
                              <ToggleRight className="mr-2 h-4 w-4" />
                              Make Active
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default memo(DiscountsTable);

function getDiscountStatus(discount: Discount) {
  const now = new Date();
  const validFrom = discount.validFrom ? new Date(discount.validFrom) : null;
  const validTo = discount.validTo ? new Date(discount.validTo) : null;

  if (!discount.isActive) {
    return { label: 'Inactive', variant: 'secondary' as const };
  }

  if (validFrom && now < validFrom) {
    return { label: 'Scheduled', variant: 'outline' as const };
  }

  if (validTo && now > validTo) {
    return { label: 'Expired', variant: 'destructive' as const };
  }

  return { label: 'Active', variant: 'default' as const };
}
