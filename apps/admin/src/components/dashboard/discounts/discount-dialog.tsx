'use client';

// Node Modules
import React, { memo, useEffect } from 'react';
import { useForm, z, zodResolver } from '@repo/ui/lib/form';
import { CalendarIcon, Percent } from '@repo/ui/lib/icons';
import { format } from '@repo/ui/lib/date';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Calendar } from '@repo/ui/components/base/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/base/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Input } from '@repo/ui/components/base/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/base/popover';
import { Switch } from '@repo/ui/components/base/switch';

// Hooks
// import { useProduct } from '@/hooks/useProduct';

// Types
import type { Discount } from '@repo/types/discount';

// Form schema
const discountFormSchema = z
  .object({
    productId: z.string().min(1, 'Product ID is required'),
    discountValue: z
      .number()
      .min(0, 'Discount must be positive')
      .max(100, 'Discount cannot exceed 100%'),
    validFrom: z.date().optional(),
    validTo: z.date().optional(),
    isActive: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.validFrom && data.validTo) {
        return data.validFrom < data.validTo;
      }
      return true;
    },
    {
      message: 'Valid from date must be before valid to date',
      path: ['validTo'],
    },
  );

type DiscountFormValues = z.infer<typeof discountFormSchema>;

interface DiscountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  discount?: Discount | null;
  onSubmit: (values: DiscountFormValues) => void;
  isLoading?: boolean;
}

function DiscountDialog({
  open,
  onOpenChange,
  discount,
  onSubmit,
  isLoading = false,
}: DiscountDialogProps) {
  // const { products } = useProduct();

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      productId: '',
      discountValue: 0,
      validFrom: undefined,
      validTo: undefined,
      isActive: true,
    },
  });

  // Reset form when dialog opens/closes or discount changes
  useEffect(() => {
    if (open) {
      if (discount) {
        // Edit mode
        form.reset({
          productId: discount.productId,
          discountValue: discount.discountValue,
          validFrom: discount.validFrom
            ? new Date(discount.validFrom)
            : undefined,
          validTo: discount.validTo ? new Date(discount.validTo) : undefined,
          isActive: discount.isActive,
        });
      } else {
        // Create mode
        form.reset({
          productId: '',
          discountValue: 0,
          validFrom: undefined,
          validTo: undefined,
          isActive: true,
        });
      }
    }
  }, [open, discount, form]);

  const handleSubmit = (values: DiscountFormValues) => {
    onSubmit(values);
  };

  const isEditMode = !!discount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="bg-[var(--baladi-primary)]/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <Percent className="h-4 w-4 text-[var(--baladi-primary)]" />
            </div>
            {isEditMode ? 'Edit Discount' : 'Create Discount'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update discount details for the selected product.'
              : 'Create a new discount for a specific product.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product ID"
                        {...field}
                        disabled={isEditMode}
                        className={
                          isEditMode ? 'bg-[var(--baladi-surface)]' : ''
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      {isEditMode
                        ? 'Product ID cannot be changed when editing'
                        : 'The unique identifier of the product to apply discount'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Percentage</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0"
                          min="0"
                          max="100"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                          className="pr-8"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-sm text-[var(--baladi-gray)]">
                            %
                          </span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Discount percentage (0-100%)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="validFrom"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Valid From</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value && 'text-muted-foreground'
                              }`}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Optional start date</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="validTo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Valid To</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value && 'text-muted-foreground'
                              }`}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const validFrom = form.getValues('validFrom');
                              return (
                                date < new Date() ||
                                (validFrom && date <= validFrom) ||
                                false
                              );
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Optional end date</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-[var(--baladi-border)] p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active Status</FormLabel>
                      <FormDescription>
                        Whether this discount is currently active
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="hover:bg-[var(--baladi-primary)]/90 bg-[var(--baladi-primary)]"
              >
                {isLoading
                  ? isEditMode
                    ? 'Updating...'
                    : 'Creating...'
                  : isEditMode
                    ? 'Update Discount'
                    : 'Create Discount'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(DiscountDialog);
