'use client';

// Node Modules
import React, { memo, useState } from 'react';
import { useForm, zodResolver, z } from '@repo/ui/lib/form';
import { MapPin, Phone, Tag, Home, Building } from '@repo/ui/lib/icons';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';

// Hooks
import { useAddress } from '@/hooks/useAddress';

const addAddressSchema = z.object({
  addressLine1: z.string().min(1, 'Adresselinje 1 er påkrevd'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'By er påkrevd'),
  state: z.string().min(1, 'Fylke er påkrevd'),
  postalCode: z.string().min(4, 'Postnummer må være minst 4 siffer'),
  country: z.string().min(1, 'Land er påkrevd'),
  phoneNumber: z.string().optional(),
  label: z.enum(['home', 'work', 'other']).optional(),
  isDefault: z.boolean(),
});

type AddAddressFormValues = z.infer<typeof addAddressSchema>;

function AddAddressDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { addAddressMutation } = useAddress();

  const form = useForm<AddAddressFormValues>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phoneNumber: '',
      label: 'home',
      isDefault: false,
    },
  });

  function onSubmit(data: AddAddressFormValues) {
    addAddressMutation.mutate(data, {
      onSettled: function () {
        setOpen(false);
        form.reset();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-sora)] text-[var(--baladi-text)]">
            Legg til ny adresse
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Adresse type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-lg border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]">
                        <SelectValue placeholder="Velg adresse type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="home">
                        <div className="flex items-center space-x-2">
                          <Home className="h-4 w-4" />
                          <span>Hjem</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="work">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4" />
                          <span>Jobb</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="other">
                        <div className="flex items-center space-x-2">
                          <Tag className="h-4 w-4" />
                          <span>Annet</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Adresselinje 1 *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                      <Input
                        placeholder="Gateadresse, husnummer"
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
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Adresselinje 2
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                      <Input
                        placeholder="Leilighet, suite, etasje (valgfritt)"
                        className="h-12 rounded-lg border-[var(--baladi-border)] pl-10 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                      By *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="By"
                        className="h-12 rounded-lg border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                      Postnummer *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0000"
                        className="h-12 rounded-lg border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                      Fylke *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Fylke"
                        className="h-12 rounded-lg border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                      Land *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Land"
                        className="h-12 rounded-lg border-[var(--baladi-border)] focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                    Telefonnummer
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                      <Input
                        type="tel"
                        placeholder="+47 000 00 000"
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
                disabled={addAddressMutation.isPending}
                className="hover:bg-[var(--baladi-primary)]/90 h-12 w-full rounded-lg bg-[var(--baladi-primary)] font-[family-name:var(--font-sora)] font-semibold"
              >
                {addAddressMutation.isPending
                  ? 'Legger til...'
                  : 'Legg til adresse'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(AddAddressDialog);
