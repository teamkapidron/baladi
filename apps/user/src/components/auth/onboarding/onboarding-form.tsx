'use client';

// Node Modules
import { memo } from 'react';
import { zodResolver, useForm } from '@repo/ui/lib/form';
import {
  Building2,
  Hash,
  Phone,
  MapPin,
  ArrowRight,
  Loader2,
  Shield,
} from '@repo/ui/lib/icons';

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
    <div className="w-full space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <Building2 className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Bedriftsnavn
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Skriv inn navnet på bedriften din"
                    className="focus:ring-[var(--baladi-primary)]/20 w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizationNumber"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <Hash className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Organisasjonsnummer
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="f.eks. 123 456 789"
                    className="focus:ring-[var(--baladi-primary)]/20 w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <Phone className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Telefonnummer
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="+47 123 45 678"
                    className="focus:ring-[var(--baladi-primary)]/20 w-full rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  <MapPin className="h-4 w-4 text-[var(--baladi-gray)]" />
                  Forretningsadresse
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Gateadresse, postnummer og sted"
                    rows={3}
                    className="focus:ring-[var(--baladi-primary)]/20 w-full resize-none rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-4 py-3 font-[family-name:var(--font-dm-sans)] transition-all duration-200 focus:border-[var(--baladi-primary)] focus:bg-white focus:ring-2"
                  />
                </FormControl>
                <FormMessage className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-error)]" />
              </FormItem>
            )}
          />

          {/* Information box */}
          <div className="rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-[var(--baladi-info)]/10 flex h-6 w-6 items-center justify-center rounded-full">
                <Shield className="h-3 w-3 text-[var(--baladi-info)]" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-xs leading-relaxed text-[var(--baladi-gray)]">
                  <strong className="text-[var(--baladi-dark)]">
                    Sikkerhet:
                  </strong>{' '}
                  All informasjon blir behandlet konfidensielt og i henhold til
                  GDPR. Vi bruker denne informasjonen kun for å verifisere
                  bedriften din.
                </p>
              </div>
            </div>
          </div>

          {/* Required fields notice */}
          <div className="flex items-center justify-center">
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
              <span className="text-[var(--baladi-error)]">*</span> Alle felt er
              påkrevd for videre behandling
            </p>
          </div>

          <Button
            type="submit"
            disabled={onboardingMutation.isPending}
            className="focus:ring-[var(--baladi-primary)]/30 group relative w-full overflow-hidden rounded-lg bg-[var(--baladi-primary)] px-6 py-4 font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[var(--baladi-secondary)] hover:shadow-lg focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>

            <div className="relative flex items-center justify-center space-x-2">
              {onboardingMutation.isPending ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin text-white" />
                  <span>Behandler informasjon...</span>
                </>
              ) : (
                <>
                  <span>Fullfør registrering</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </div>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default memo(OnboardingForm);
