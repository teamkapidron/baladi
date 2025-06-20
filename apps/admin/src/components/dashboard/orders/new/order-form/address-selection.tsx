'use client';
// Node Modules
import { useEffect } from 'react';
import { Control } from '@repo/ui/lib/form';
import { useQueryClient } from '@tanstack/react-query';

// Icons
import { FileText, MapPin, Plus } from '@repo/ui/lib/icons';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Textarea } from '@repo/ui/components/base/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';
import AddAddressDialog from './add-address-dialog';

// Hooks
import { useCreateOrder } from '@/hooks/useOrder/useCreateOrder';

// Types
import type { OrderFormValues } from './schema';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

interface AddressSelectionProps {
  control: Control<OrderFormValues>;
  userId: string;
}

export function AddressSelection({ control, userId }: AddressSelectionProps) {
  const { getAddressesQuery } = useCreateOrder(userId);
  const addresses = getAddressesQuery.data?.addresses || [];
  const queryClient = useQueryClient();

  useEffect(() => {
    if (userId) {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.GET_ADDRESSES_ADMIN, userId],
      });
    }
  }, [userId, queryClient]);

  return (
    <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
          <FileText className="h-5 w-5 text-purple-600" />
        </div>
        <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
          Tilleggsinformasjon
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="shippingAddressId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                Leveringsadresse *
              </FormLabel>
              <FormControl>
                {userId ? (
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                      disabled={getAddressesQuery.isLoading}
                    >
                      <SelectTrigger className="pl-10 focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]">
                        <SelectValue
                          placeholder={
                            getAddressesQuery.isLoading
                              ? 'Laster adresser...'
                              : 'Velg leveringsadresse'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {addresses?.map((address) => (
                          <SelectItem key={address._id} value={address._id}>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {address.addressLine1}
                              </span>
                              <span className="text-sm text-[var(--baladi-gray)]">
                                {address.city}, {address.postalCode}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                        <AddAddressDialog userId={userId}>
                          <div className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center space-x-2 rounded-sm px-2 py-1.5 text-sm text-[var(--baladi-primary)]">
                            <Plus className="h-4 w-4" />
                            <span>Legg til ny adresse</span>
                          </div>
                        </AddAddressDialog>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                    <div className="bg-muted text-muted-foreground flex h-10 items-center rounded-md border border-[var(--baladi-border)] px-3 py-2 pl-10 text-sm">
                      Velg en kunde først
                    </div>
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="palletType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                Palletype
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]">
                    <SelectValue placeholder="Velg palletype" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mt-6">
        <FormField
          control={control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                Notater
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Legg til notater for ordren..."
                  className="focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
