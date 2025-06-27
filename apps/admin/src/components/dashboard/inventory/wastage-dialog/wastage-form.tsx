'use client';

// Node Modules
import React, { memo } from 'react';
import { useForm, zodResolver } from '@repo/ui/lib/form';
import {
  Trash2,
  Hash,
  Loader2,
  Save,
  MessageSquare,
  AlertTriangle,
} from '@repo/ui/lib/icons';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Input } from '@repo/ui/components/base/input';
import { Textarea } from '@repo/ui/components/base/textarea';
import { Form } from '@repo/ui/components/base/form';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useInventoryWastage } from '@/hooks/useInventory';

// Types/Utils
import {
  AddWastageFormValues,
  addWastageFormSchema,
  EditWastageFormValues,
  editWastageFormSchema,
} from './schema';
import { InventoryResponse } from '@/hooks/useInventory/types';

interface WastageFormProps {
  inventoryItem: InventoryResponse;
  isEdit?: boolean;
  onSuccess?: () => void;
}

function WastageForm(props: WastageFormProps) {
  const { inventoryItem, isEdit = false, onSuccess } = props;
  const { createInventoryWastageMutation, updateInventoryWastageMutation } =
    useInventoryWastage();

  const form = useForm<AddWastageFormValues | EditWastageFormValues>({
    resolver: zodResolver(
      isEdit ? editWastageFormSchema : addWastageFormSchema,
    ),
    defaultValues: {
      quantity: isEdit ? inventoryItem.wastage?.quantity || 0 : 0,
      reason: isEdit ? inventoryItem.wastage?.reason || '' : '',
      note: isEdit ? inventoryItem.wastage?.note || '' : '',
    },
  });

  function onSubmit(values: AddWastageFormValues | EditWastageFormValues) {
    if (isEdit) {
      updateInventoryWastageMutation.mutate(
        {
          inventoryWastageId: inventoryItem.wastage?._id || '',
          quantity: values.quantity,
          reason: values.reason || undefined,
          note: values.note || undefined,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        },
      );
    } else {
      createInventoryWastageMutation.mutate(
        {
          inventoryId: inventoryItem._id,
          quantity: values.quantity,
          reason: values.reason || undefined,
          note: values.note || undefined,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        },
      );
    }
  }

  const maxQuantity = inventoryItem.inputQuantity;
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
          <Trash2 className="h-8 w-8 text-white" />
        </div>
        <h3 className="mb-2 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
          {isEdit ? 'Rediger Svinn' : 'Registrer Svinn'}
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          {isEdit
            ? 'Oppdater svinnmengde og detaljer'
            : 'Registrer svinn for dette lagerpartiet'}
        </p>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-amber-800">
              Tilgjengelig mengde: {maxQuantity} enheter
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-amber-700">
              Du kan registrere svinn på inntil {maxQuantity} enheter.
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <Hash className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Svinnmengde
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="1"
                    max={maxQuantity}
                    placeholder="Skriv inn antall enheter"
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                    className="w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <AlertTriangle className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Årsak
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="F.eks. Utgått, skadet, osv."
                    className="w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <MessageSquare className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Notat
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tilleggsnotater om svinnet..."
                    rows={3}
                    className="w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={
                createInventoryWastageMutation.isPending ||
                updateInventoryWastageMutation.isPending
              }
              className="group relative flex-1 overflow-hidden rounded-lg bg-red-500 px-6 py-4 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <div className="relative flex items-center justify-center space-x-2">
                {createInventoryWastageMutation.isPending ||
                updateInventoryWastageMutation.isPending ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin text-white" />
                    <span>{isEdit ? 'Oppdaterer...' : 'Registrerer...'}</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>{isEdit ? 'Oppdater Svinn' : 'Registrer Svinn'}</span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default memo(WastageForm);
