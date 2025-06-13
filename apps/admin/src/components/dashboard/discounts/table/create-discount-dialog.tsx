'use client';

// Node Modules
import React, { useState } from 'react';
import { useForm, zodResolver, z } from '@repo/ui/lib/form';
import { format, parse } from '@repo/ui/lib/date';
import { DollarSign, Calendar, Package } from '@repo/ui/lib/icons';

// Components
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import ProductSearchCombobox from '../product-search-combobox';

// Hooks
import { useDiscount } from '@/hooks/useDiscount';

interface Product {
  _id: string;
  name: string;
}

const createDiscountSchema = z.object({
  product: z
    .object({
      _id: z.string(),
      name: z.string(),
    })
    .nullable()
    .refine((val: any) => val !== null, {
      message: 'Produkt er påkrevd',
    }),
  discountValue: z.number().min(0.01, 'Rabatt beløp må være større enn 0'),
  validFrom: z.string().optional(),
  validTo: z.string().optional(),
});

type CreateDiscountFormValues = z.infer<typeof createDiscountSchema>;

function CreateDiscountDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { createDiscountMutation } = useDiscount();

  const form = useForm<CreateDiscountFormValues>({
    resolver: zodResolver(createDiscountSchema),
    defaultValues: {
      product: null,
      discountValue: 0,
      validFrom: '',
      validTo: '',
    },
  });

  const onSubmit = (data: CreateDiscountFormValues) => {
    if (!data.product) return;

    const parsedValidFrom = data.validFrom
      ? parse(data.validFrom, 'yyyy-MM-dd', new Date())
      : undefined;

    const parsedValidTo = data.validTo
      ? parse(data.validTo, 'yyyy-MM-dd', new Date())
      : undefined;

    createDiscountMutation.mutate({
      productId: data.product._id,
      discountValue: data.discountValue,
      validFrom: parsedValidFrom
        ? format(parsedValidFrom, 'yyyy-MM-dd')
        : undefined,
      validTo: parsedValidTo ? format(parsedValidTo, 'yyyy-MM-dd') : undefined,
    });

    setOpen(false);
    form.reset();
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset();
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Velg Produkt *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <ProductSearchCombobox
                        value={field.value}
                        onSelect={field.onChange}
                        placeholder="Søk og velg et produkt..."
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Rabatt Beløp (kr) *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-success)]" />
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="Skriv inn rabatt beløp"
                        className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value || ''}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Gyldig Fra
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                      <Input
                        type="date"
                        className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Gyldig Til
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                      <Input
                        type="date"
                        className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={createDiscountMutation.isPending}
                className="hover:bg-[var(--baladi-primary)]/90 h-12 w-full rounded-lg bg-[var(--baladi-primary)] font-[family-name:var(--font-sora)] font-semibold"
              >
                {createDiscountMutation.isPending
                  ? 'Oppretter...'
                  : 'Opprett Rabatt'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDiscountDialog;
