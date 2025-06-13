'use client';

// Node Modules
import React, { memo, useCallback, useMemo, useState } from 'react';

import { format, parse } from '@repo/ui/lib/date';
import {
  Calendar,
  Package,
  DollarSign,
  MoreHorizontal,
  ToggleLeft,
  ToggleRight,
  Plus,
  Edit,
} from '@repo/ui/lib/icons';

// Components
import { Badge } from '@repo/ui/components/base/badge';
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/base/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@repo/ui/components/base/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';
import ProductSearchCombobox from './product-search-combobox';

// Hooks
import { useDiscount } from '@/hooks/useDiscount';

// Types
import type { Discount } from '@repo/types/discount';

interface Product {
  _id: string;
  name: string;
}

type DiscountWithProduct = Omit<Discount, 'productId'> & {
  productId: Product;
};

function CreateDiscountDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { createDiscountMutation } = useDiscount();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedProduct) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const discountValue = Number(formData.get('discountValue'));
    const validFrom = formData.get('validFrom') as string;
    const validTo = formData.get('validTo') as string;
    const parsedValidFrom = validFrom
      ? parse(validFrom, 'yyyy-MM-dd', new Date())
      : undefined;

    const parsedValidTo = validTo
      ? parse(validTo, 'yyyy-MM-dd', new Date())
      : undefined;
    createDiscountMutation.mutate({
      productId: selectedProduct._id,
      discountValue,
      validFrom: parsedValidFrom
        ? format(parsedValidFrom, 'yyyy-MM-dd')
        : undefined,
      validTo: parsedValidTo ? format(parsedValidTo, 'yyyy-MM-dd') : undefined,
    });

    setOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSelectedProduct(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-sora)] text-[var(--baladi-text)]">
            Legg til Produkt Rabatt
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--baladi-text)]">
              Velg Produkt *
            </label>
            <ProductSearchCombobox
              value={selectedProduct}
              onSelect={setSelectedProduct}
              placeholder="Søk og velg et produkt..."
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--baladi-text)]">
              Rabatt Beløp (kr) *
            </label>
            <Input
              name="discountValue"
              type="number"
              min={0}
              step="0.01"
              required
              placeholder="Skriv inn rabatt beløp"
              className="border-[var(--baladi-border)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--baladi-text)]">
              Gyldig Fra
            </label>
            <Input
              name="validFrom"
              type="date"
              className="border-[var(--baladi-border)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--baladi-text)]">
              Gyldig Til
            </label>
            <Input
              name="validTo"
              type="date"
              className="border-[var(--baladi-border)]"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={createDiscountMutation.isPending || !selectedProduct}
              className="w-full"
            >
              {createDiscountMutation.isPending
                ? 'Oppretter...'
                : 'Opprett Rabatt'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function UpdateDiscountDialog({
  children,
  discount,
}: {
  children: React.ReactNode;
  discount: DiscountWithProduct;
}) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    discount.productId,
  );
  const { updateDiscountMutation } = useDiscount();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedProduct) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const discountValue = Number(formData.get('discountValue'));
    const validFrom = formData.get('validFrom') as string;
    const validTo = formData.get('validTo') as string;
    const parsedValidFrom = validFrom
      ? parse(validFrom, 'yyyy-MM-dd', new Date())
      : undefined;

    const parsedValidTo = validTo
      ? parse(validTo, 'yyyy-MM-dd', new Date())
      : undefined;

    updateDiscountMutation.mutate({
      discountId: discount._id,
      discount: {
        productId: selectedProduct._id,
        discountValue,
        validFrom: parsedValidFrom
          ? format(parsedValidFrom, 'yyyy-MM-dd')
          : undefined,
        validTo: parsedValidTo
          ? format(parsedValidTo, 'yyyy-MM-dd')
          : undefined,
      },
    });

    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSelectedProduct(discount.productId);
    }
  };

  // Format dates for input fields
  const formatDateForInput = (date: Date | string | undefined) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'yyyy-MM-dd');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-sora)] text-[var(--baladi-text)]">
            Oppdater Produkt Rabatt
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--baladi-text)]">
              Produkt *
            </label>
            <div className="text-[var(--baladi-text)]">
              {discount.productId.name}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--baladi-text)]">
              Rabatt Beløp (kr) *
            </label>
            <Input
              name="discountValue"
              type="number"
              min={0}
              step="0.01"
              required
              defaultValue={discount.discountValue}
              placeholder="Skriv inn rabatt beløp"
              className="border-[var(--baladi-border)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--baladi-text)]">
              Gyldig Fra
            </label>
            <Input
              name="validFrom"
              type="date"
              defaultValue={formatDateForInput(discount.validFrom)}
              className="border-[var(--baladi-border)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--baladi-text)]">
              Gyldig Til
            </label>
            <Input
              name="validTo"
              type="date"
              defaultValue={formatDateForInput(discount.validTo)}
              className="border-[var(--baladi-border)]"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={updateDiscountMutation.isPending || !selectedProduct}
              className="w-full"
            >
              {updateDiscountMutation.isPending
                ? 'Oppdaterer...'
                : 'Oppdater Rabatt'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DiscountsTable() {
  const {
    discounts: data,
    toggleDiscountActiveMutation,
    updateDiscountMutation,
  } = useDiscount();

  const discounts = useMemo(
    () => data?.discounts || [],
    [data?.discounts],
  ) as DiscountWithProduct[];

  const handleToggleActive = useCallback(
    (discount: DiscountWithProduct) => {
      toggleDiscountActiveMutation.mutate({ discountId: discount._id });
    },
    [toggleDiscountActiveMutation],
  );

  if (discounts.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-text)]">
            Produkt Rabatter
          </h2>
          <CreateDiscountDialog>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Legg til Rabatt
            </Button>
          </CreateDiscountDialog>
        </div>

        <div className="rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="bg-[var(--baladi-primary)]/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <DollarSign className="h-8 w-8 text-[var(--baladi-primary)]" />
              </div>
              <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-text)]">
                Ingen rabatter funnet
              </h3>
              <p className="mt-2 text-sm text-[var(--baladi-gray)]">
                Opprett din første rabatt for å begynne å tilby kampanjer til
                kunder.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-text)]">
          Produkt Rabatter
        </h2>
        <CreateDiscountDialog>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Legg til Rabatt
          </Button>
        </CreateDiscountDialog>
      </div>

      <div className="rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
        <div className="overflow-hidden rounded-xl">
          <Table>
            <TableHeader>
              <TableRow className="border-[var(--baladi-border)] bg-[var(--baladi-surface)]">
                <TableHead className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-text)]">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Produkt
                  </div>
                </TableHead>
                <TableHead className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-text)]">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Rabatt Beløp
                  </div>
                </TableHead>
                <TableHead className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-text)]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Gyldig Periode
                  </div>
                </TableHead>
                <TableHead className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-text)]">
                  Status
                </TableHead>
                <TableHead className="w-[100px] font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-text)]">
                  Handlinger
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
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-[var(--baladi-text)]">
                          {discount.productId.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-[var(--baladi-primary)]">
                          {discount.discountValue.toLocaleString('no-NO', {
                            style: 'currency',
                            currency: 'NOK',
                          })}
                        </span>
                        <span className="text-sm text-[var(--baladi-gray)]">
                          rabatt
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        {discount.validFrom && (
                          <div className="text-[var(--baladi-text)]">
                            Fra:{' '}
                            {format(new Date(discount.validFrom), 'yyyy-MM-dd')}
                          </div>
                        )}
                        {discount.validTo && (
                          <div className="text-[var(--baladi-text)]">
                            Til:{' '}
                            {format(new Date(discount.validTo), 'yyyy-MM-dd')}
                          </div>
                        )}
                        {!discount.validFrom && !discount.validTo && (
                          <div className="text-[var(--baladi-gray)]">
                            Ingen tidsbegrensning
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
                            <span className="sr-only">Åpne meny</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <UpdateDiscountDialog discount={discount}>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Rediger
                            </DropdownMenuItem>
                          </UpdateDiscountDialog>
                          <DropdownMenuItem
                            onClick={() => handleToggleActive(discount)}
                            className="cursor-pointer"
                            disabled={
                              toggleDiscountActiveMutation.isPending ||
                              updateDiscountMutation.isPending
                            }
                          >
                            {discount.isActive ? (
                              <>
                                <ToggleLeft className="mr-2 h-4 w-4" />
                                Gjør Inaktiv
                              </>
                            ) : (
                              <>
                                <ToggleRight className="mr-2 h-4 w-4" />
                                Gjør Aktiv
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
    </div>
  );
}

export default memo(DiscountsTable);

function getDiscountStatus(discount: DiscountWithProduct) {
  const now = new Date();
  const validFrom = discount.validFrom ? new Date(discount.validFrom) : null;
  const validTo = discount.validTo ? new Date(discount.validTo) : null;

  if (!discount.isActive) {
    return { label: 'Inaktiv', variant: 'secondary' as const };
  }

  if (validFrom && now < validFrom) {
    return { label: 'Planlagt', variant: 'outline' as const };
  }

  if (validTo && now > validTo) {
    return { label: 'Utløpt', variant: 'destructive' as const };
  }

  return { label: 'Aktiv', variant: 'default' as const };
}
