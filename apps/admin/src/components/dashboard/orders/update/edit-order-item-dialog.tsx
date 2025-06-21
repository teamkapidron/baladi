'use client';

// Node Modules
import React, { useEffect, useState, memo, useMemo } from 'react';
import { zodResolver, useForm, z } from '@repo/ui/lib/form';

// Icons
import { Package, Calculator } from '@repo/ui/lib/icons';

// Components
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';
import { Separator } from '@repo/ui/components/base/separator';

// Types/Utils
import { formatPrice } from '@/utils/price.util';

const editOrderItemSchema = z.object({
  quantity: z.number().min(0, 'Antall må være minst 0'),
  price: z.number().min(0, 'Pris kan ikke være negativ'),
  vatPercentage: z
    .number()
    .min(0, 'MVA kan ikke være negativ')
    .max(100, 'MVA kan ikke være større enn 100'),
  discountAmount: z.number().min(0, 'Rabatt kan ikke være negativ'),
  bulkDiscountAmount: z.number().min(0, 'Bulkrabatt kan ikke være negativ'),
});

type EditOrderItemFormData = z.infer<typeof editOrderItemSchema>;

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  vatPercentage?: number;
  discountAmount?: number;
  bulkDiscountAmount?: number;
  name?: string;
}

interface EditOrderItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: EditOrderItemFormData) => void;
  item: OrderItem;
}

function EditOrderItemDialog({
  open,
  onClose,
  onSave,
  item,
}: EditOrderItemDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EditOrderItemFormData>({
    resolver: zodResolver(editOrderItemSchema),
    defaultValues: {
      quantity: item.quantity,
      price: item.price,
      vatPercentage: item.vatPercentage || 0,
      discountAmount: item.discountAmount || 0,
      bulkDiscountAmount: item.bulkDiscountAmount || 0,
    },
  });

  const { watch, setValue } = form;
  const [quantity, price, vatPercentage, discountAmount, bulkDiscountAmount] =
    watch([
      'quantity',
      'price',
      'vatPercentage',
      'discountAmount',
      'bulkDiscountAmount',
    ]);

  const calculatedValues = useMemo(() => {
    const vatAmount = (price * vatPercentage) / 100;
    const priceWithVat = price + vatAmount;
    const discountedPrice = price - discountAmount;
    const bulkDiscountedPrice = discountedPrice - bulkDiscountAmount;
    const finalItemPrice = bulkDiscountedPrice;
    const finalVatAmount = (price * vatPercentage) / 100;
    const finalPriceWithVat = finalItemPrice + finalVatAmount;

    const subtotal = price * quantity;
    const totalVat = finalVatAmount * quantity;
    const totalWithVat = finalPriceWithVat * quantity;
    const totalDiscount = (discountAmount + bulkDiscountAmount) * quantity;

    return {
      vatAmount: Math.round(vatAmount * 100) / 100,
      priceWithVat: Math.round(priceWithVat * 100) / 100,
      discountedPrice: Math.round(discountedPrice * 100) / 100,
      bulkDiscountedPrice: Math.round(bulkDiscountedPrice * 100) / 100,
      finalItemPrice: Math.round(finalItemPrice * 100) / 100,
      finalVatAmount: Math.round(finalVatAmount * 100) / 100,
      finalPriceWithVat: Math.round(finalPriceWithVat * 100) / 100,
      subtotal: Math.round(subtotal * 100) / 100,
      totalVat: Math.round(totalVat * 100) / 100,
      totalWithVat: Math.round(totalWithVat * 100) / 100,
      totalDiscount: Math.round(totalDiscount * 100) / 100,
    };
  }, [price, vatPercentage, quantity, discountAmount, bulkDiscountAmount]);

  useEffect(() => {
    if (open) {
      form.reset({
        quantity: item.quantity,
        price: item.price,
        vatPercentage: item.vatPercentage,
        discountAmount: item.discountAmount || 0,
        bulkDiscountAmount: item.bulkDiscountAmount || 0,
      });
    }
  }, [open, item, form]);

  const handleSubmit = (data: EditOrderItemFormData) => {
    setIsSubmitting(true);
    onSave(data);
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-secondary)]/10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br">
              <Package className="h-5 w-5 text-[var(--baladi-primary)]" />
            </div>
            <div>
              <DialogTitle className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
                Rediger Ordre Vare
              </DialogTitle>
              <DialogDescription className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                {item.name}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                Redigerbare Felter
              </h3>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                        Antall
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min="1"
                            step="1"
                            className="h-11 pr-10 text-right font-[family-name:var(--font-dm-sans)]"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--baladi-gray)]">
                            stk
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                        Pris per stk (eks. mva)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            className="h-11 pr-10 text-right font-[family-name:var(--font-dm-sans)]"
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              field.onChange(Math.round(value * 100) / 100);
                            }}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--baladi-gray)]">
                            kr
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vatPercentage"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                        MVA prosent
                        {item.vatPercentage && (
                          <span className="ml-2 text-xs text-[var(--baladi-gray)]">
                            ({item.vatPercentage}% fra produkt)
                          </span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            className="h-11 pr-10 text-right font-[family-name:var(--font-dm-sans)]"
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              field.onChange(Math.round(value * 10) / 10);
                            }}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--baladi-gray)]">
                            %
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountAmount"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                        Rabatt per stk
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            className="h-11 pr-10 text-right font-[family-name:var(--font-dm-sans)]"
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              field.onChange(Math.round(value * 100) / 100);
                            }}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--baladi-gray)]">
                            kr
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bulkDiscountAmount"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                        Bulkrabatt per stk
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            className="h-11 pr-10 text-right font-[family-name:var(--font-dm-sans)]"
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              field.onChange(Math.round(value * 100) / 100);
                            }}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--baladi-gray)]">
                            kr
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-[var(--baladi-primary)]" />
                <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                  Kalkulerte Verdier
                </h3>
              </div>

              <div className="bg-[var(--baladi-light)]/30 space-y-4 rounded-lg border border-[var(--baladi-border)] p-6">
                <div className="space-y-3">
                  <h4 className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                    Per stykk
                  </h4>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Opprinnelig pris:
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-[var(--baladi-dark)]">
                        {formatPrice(price)} kr
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        MVA ({vatPercentage}%):
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-[var(--baladi-dark)]">
                        {formatPrice(calculatedValues.vatAmount)} kr
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Etter rabatt:
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-[var(--baladi-dark)]">
                        {formatPrice(calculatedValues.discountedPrice)} kr
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Etter bulkrabatt:
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-[var(--baladi-dark)]">
                        {formatPrice(calculatedValues.bulkDiscountedPrice)} kr
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Endelig pris (inkl. mva):
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-[var(--baladi-primary)]">
                        {formatPrice(calculatedValues.finalPriceWithVat)} kr
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                    Totalt ({quantity} stk)
                  </h4>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Subtotal (eks. mva):
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-[var(--baladi-dark)]">
                        {formatPrice(calculatedValues.subtotal)} kr
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Total rabatt:
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-red-600">
                        -{formatPrice(calculatedValues.totalDiscount)} kr
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Totalt MVA:
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-[var(--baladi-dark)]">
                        {formatPrice(calculatedValues.totalVat)} kr
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Total (inkl. mva):
                      </span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-[var(--baladi-dark)]">
                        {formatPrice(calculatedValues.totalWithVat)} kr
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-[var(--baladi-primary)]/5 -m-2 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-sora)] text-base font-bold text-[var(--baladi-dark)]">
                      Endelig Total:
                    </span>
                    <span className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-primary)]">
                      {formatPrice(calculatedValues.totalWithVat)} kr
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="hover:bg-[var(--baladi-light)]/50 border-[var(--baladi-border)] font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]"
                >
                  Avbryt
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="hover:bg-[var(--baladi-primary)]/90 bg-[var(--baladi-primary)] font-[family-name:var(--font-dm-sans)] text-white"
                >
                  {isSubmitting ? 'Lagrer...' : 'Lagre Endringer'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(EditOrderItemDialog);
