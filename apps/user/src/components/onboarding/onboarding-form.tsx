'use client';

// Node Modules
import { memo } from 'react';
import { zodResolver, useForm } from '@repo/ui/lib/form';
import { Building2, Hash, Phone, MapPin } from '@repo/ui/lib/icons';

// Components
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
import { Textarea } from '@repo/ui/components/base/textarea';

// Hooks
import { useAuth } from '@/hooks/useAuth';

// Types/Utils/Constants
import { onboardingSchema, OnboardingSchema } from './schema';

function OnboardingForm() {
  const { onboardingMutation } = useAuth();

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      companyName: '',
      organizationNumber: '',
      phoneNumber: '',
      address: '',
    },
  });

  function onSubmit(values: OnboardingSchema) {
    onboardingMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Navn på bedrift
                </FormLabel>
                <p className="text-sm text-[var(--baladi-primary)]">
                  * Alle felt er påkrevd
                </p>
              </div>
              <FormControl>
                <Input placeholder="Skriv inn navnet på bedriften" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="organizationNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Organisasjonsnummer
                </FormLabel>
                <p className="text-sm text-[var(--baladi-primary)]">
                  * Alle felt er påkrevd
                </p>
              </div>
              <FormControl>
                <Input
                  placeholder="Skriv inn organisasjonsnummeret"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefonnummer
                </FormLabel>
                <p className="text-sm text-[var(--baladi-primary)]">
                  * Alle felt er påkrevd
                </p>
              </div>
              <FormControl>
                <Input placeholder="Skriv inn telefonnummeret" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Adresse
                </FormLabel>
                <p className="text-sm text-[var(--baladi-primary)]">
                  * Alle felt er påkrevd
                </p>
              </div>
              <FormControl>
                <Textarea placeholder="Skriv inn adressen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={onboardingMutation.isPending}
        >
          {onboardingMutation.isPending ? 'Oppdaterer...' : 'Oppdater'}
        </Button>
      </form>
    </Form>
  );
}

export default memo(OnboardingForm);
