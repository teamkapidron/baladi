'use client';
import React, { useState } from 'react';
import { format, parse } from '@repo/ui/lib/date';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@repo/ui/components/base/card';
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@repo/ui/components/base/dialog';
import { useBulkDiscount } from '@/hooks/useDiscount';
import { Plus } from '@repo/ui/lib/icons';

function BulkDiscountsCards() {
  const { bulkDiscounts, isLoadingBulkDiscounts, createBulkDiscountMutation } =
    useBulkDiscount();
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const minQuantity = Number(formData.get('minQuantity'));
    const discountPercentage = Number(formData.get('discountPercentage'));
    const validFrom = formData.get('validFrom') as string;
    const validTo = formData.get('validTo') as string;

    const parsedValidFrom = validFrom
      ? parse(validFrom, 'yyyy-MM-dd', new Date())
      : undefined;

    const parsedValidTo = validTo
      ? parse(validTo, 'yyyy-MM-dd', new Date())
      : undefined;

    createBulkDiscountMutation.mutate({
      minQuantity,
      discountPercentage,
      validFrom: parsedValidFrom
        ? format(parsedValidFrom, 'yyyy-MM-dd')
        : undefined,
      validTo: parsedValidTo ? format(parsedValidTo, 'yyyy-MM-dd') : undefined,
    });
    setOpen(false);
  };

  if (isLoadingBulkDiscounts) {
    return (
      <div className="text-center text-[var(--baladi-gray)]">
        Laster Bulk rabatter...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-text)]">
          Bulk Rabatter
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Legg til Bulk Rabatt
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-[family-name:var(--font-sora)] text-[var(--baladi-text)]">
                Legg til Bulk Rabatt
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--baladi-text)]">
                  Minimum Antall *
                </label>
                <Input
                  name="minQuantity"
                  type="number"
                  min={1}
                  required
                  placeholder="Skriv inn minimum antall"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--baladi-text)]">
                  Rabatt Prosent *
                </label>
                <Input
                  name="discountPercentage"
                  type="number"
                  min={1}
                  max={100}
                  required
                  placeholder="Skriv inn rabatt prosent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--baladi-text)]">
                  Gyldig Fra
                </label>
                <Input name="validFrom" type="date" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--baladi-text)]">
                  Gyldig Til
                </label>
                <Input name="validTo" type="date" />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={createBulkDiscountMutation.isPending}
                  className="w-full"
                >
                  {createBulkDiscountMutation.isPending
                    ? 'Oppretter...'
                    : 'Opprett Rabatt'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {!bulkDiscounts?.bulkDiscounts?.length ? (
        <div className="rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="bg-[var(--baladi-primary)]/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Plus className="h-8 w-8 text-[var(--baladi-primary)]" />
              </div>
              <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-text)]">
                Ingen bulk rabatter funnet
              </h3>
              <p className="mt-2 text-sm text-[var(--baladi-gray)]">
                Opprett din første bulk rabatt for å tilby mengdebasert prising
                til kunder.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bulkDiscounts.bulkDiscounts.map((discount) => (
            <Card key={discount._id} className="border-[var(--baladi-border)]">
              <CardHeader>
                <CardTitle className="text-[var(--baladi-text)]">
                  Min Antall:{' '}
                  <span className="text-[var(--baladi-primary)]">
                    {discount.minQuantity}
                  </span>
                </CardTitle>
                <CardDescription>
                  Rabatt:{' '}
                  <span className="font-semibold text-[var(--baladi-primary)]">
                    {discount.discountPercentage}%
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-[var(--baladi-gray)]">
                  {discount.validFrom && (
                    <div>
                      Fra:{' '}
                      <span className="text-[var(--baladi-text)]">
                        {format(new Date(discount.validFrom), 'yyyy-MM-dd')}
                      </span>
                    </div>
                  )}
                  {discount.validTo && (
                    <div>
                      Til:{' '}
                      <span className="text-[var(--baladi-text)]">
                        {format(new Date(discount.validTo), 'yyyy-MM-dd')}
                      </span>
                    </div>
                  )}
                  {!discount.validFrom && !discount.validTo && (
                    <div className="text-[var(--baladi-primary)]">
                      Ingen tidsbegrensning
                    </div>
                  )}
                  <div className="mt-2 border-t border-[var(--baladi-border)] pt-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        discount.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {discount.isActive ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default BulkDiscountsCards;
