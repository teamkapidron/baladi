'use client';

// Node Modules
import { Control, useFormContext } from '@repo/ui/lib/form';

// Icons
import { User, Calendar } from '@repo/ui/lib/icons';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Input } from '@repo/ui/components/base/input';
import CustomerSearchCombobox from '@/components/common/customer-search-combobox';

// Types
import type { OrderFormValues } from './schema';

interface UserSelectionProps {
  control: Control<OrderFormValues>;
}

export function UserSelection({ control }: UserSelectionProps) {
  const form = useFormContext<OrderFormValues>();
  return (
    <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
          Kundeinformasjon
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                Kunde *
              </FormLabel>
              <FormControl>
                <CustomerSearchCombobox
                  onSelect={(userId: string, userType?: string) => {
                    field.onChange(userId);
                    if (userType) {
                      form.setValue('userType', userType);
                    }
                  }}
                  value={field.value}
                  placeholder="Søk etter kunde"
                  className="focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="desiredDeliveryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                Ønsket leveringsdato *
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                  <Input
                    type="date"
                    className="pl-10 focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
