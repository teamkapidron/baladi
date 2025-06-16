// Node Modules
import { memo } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Control } from '@repo/ui/lib/form';
import { Package } from '@repo/ui/lib/icons';

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Label } from '@repo/ui/components/base/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@repo/ui/components/base/radio-group';

// Types
import { CheckoutFormSchema } from './schema';

interface PalletSelectionProps {
  control: Control<CheckoutFormSchema>;
}

function PalletSelection({ control }: PalletSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package size={20} className="text-[var(--baladi-primary)]" />
          Pallettype
        </CardTitle>
        <CardDescription>Velg ønsket pallettype for leveransen</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="palletType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <div className={cn('relative')}>
                    <RadioGroupItem value="EUR" id="EUR" className="sr-only" />
                    <Label
                      htmlFor="EUR"
                      className={cn(
                        'hover:border-[var(--baladi-primary)]/50 peer-checked:bg-[var(--baladi-primary)]/5 flex cursor-pointer items-center justify-between rounded-lg border-2 border-[var(--baladi-border)] p-4 peer-checked:border-[var(--baladi-primary)]',
                        field.value === 'EUR' &&
                          'bg-[var(--baladi-primary)]/5 border-[var(--baladi-primary)]',
                      )}
                    >
                      <div className="space-y-1">
                        <div className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
                          EUR Pallet
                        </div>
                        <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                          Standard europallet (80 x 120 cm)
                        </div>
                      </div>
                      <Package
                        size={20}
                        className="text-[var(--baladi-primary)]"
                      />
                    </Label>
                  </div>

                  <div className={cn('relative')}>
                    <RadioGroupItem
                      value="Large"
                      id="Large"
                      className="sr-only"
                    />
                    <Label
                      htmlFor="Large"
                      className={cn(
                        'hover:border-[var(--baladi-primary)]/50 peer-checked:bg-[var(--baladi-primary)]/5 flex cursor-pointer items-center justify-between rounded-lg border-2 border-[var(--baladi-border)] p-4 peer-checked:border-[var(--baladi-primary)]',
                        field.value === 'Large' &&
                          'bg-[var(--baladi-primary)]/5 border-[var(--baladi-primary)]',
                      )}
                    >
                      <div className="space-y-1">
                        <div className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
                          Large Pallet
                        </div>
                        <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                          Stor pallet (100 x 120 cm)
                        </div>
                      </div>
                      <Package
                        size={20}
                        className="text-[var(--baladi-primary)]"
                      />
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export default memo(PalletSelection);
