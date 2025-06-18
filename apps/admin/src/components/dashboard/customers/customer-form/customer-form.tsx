'use client';

// Node Modules
import { memo, useEffect } from 'react';
import { useForm, zodResolver } from '@repo/ui/lib/form';
import {
  Loader2,
  Save,
  User,
  Mail,
  Building,
  Hash,
  Phone,
  UserCheck,
} from '@repo/ui/lib/icons';
import { z } from '@repo/ui/lib/form';
import { UserType } from '@repo/types/user';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';
import { Button } from '@repo/ui/components/base/button';

const customerFormSchema = z.object({
  name: z.string().min(1, 'Navn er påkrevd'),
  email: z.string().email('Ugyldig e-postadresse'),
  companyName: z.string().optional(),
  organizationNumber: z.string().optional(),
  phoneNumber: z.string().optional(),
  userType: z.nativeEnum(UserType).default(UserType.INTERNAL),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

const userTypeOptions = [
  { label: 'Ekstern kunde', value: UserType.EXTERNAL },
  { label: 'Intern kunde', value: UserType.INTERNAL },
];

interface CustomerFormProps {
  isPending: boolean;
  defaultValues?: CustomerFormValues;
  onSubmit: (data: CustomerFormValues) => void;
}

function CustomerForm(props: CustomerFormProps) {
  const { onSubmit, isPending, defaultValues } = props;

  const form = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      organizationNumber: '',
      phoneNumber: '',
      userType: UserType.INTERNAL,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="rounded-xl border border-[var(--baladi-border)] bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] p-6 shadow-lg">
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-white">
          Opprett Ny Kunde
        </h1>
        <p className="mt-2 text-blue-100">
          Fyll ut detaljene nedenfor for å legge til en ny kunde i systemet
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                  Grunnleggende Informasjon
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                        Navn *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                          <Input
                            placeholder="Skriv inn fullt navn"
                            className="pl-10 focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                        E-postadresse *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                          <Input
                            type="email"
                            placeholder="kunde@example.com"
                            className="pl-10 focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
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
                            placeholder="+47 12 34 56 78"
                            className="pl-10 focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
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
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                        Brukertype *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <div className="relative">
                            <UserCheck className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                            <SelectTrigger className="pl-10 focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]">
                              <SelectValue placeholder="Velg brukertype" />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent>
                          {userTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Building className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
                  Bedriftsinformasjon
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                        Bedriftsnavn
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                          <Input
                            placeholder="Skriv inn bedriftsnavn"
                            className="pl-10 focus:border-[var(--baladi-primary)] focus:ring-[var(--baladi-primary)]"
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
                  name="organizationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-primary)]">
                        Organisasjonsnummer
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
                          <Input
                            placeholder="123 456 789"
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
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="submit"
              disabled={isPending}
              className="flex items-center space-x-2 bg-[var(--baladi-primary)] px-8 py-3 text-white transition-all duration-200 hover:bg-[var(--baladi-secondary)] disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span className="font-[family-name:var(--font-sora)] font-medium">
                {isPending ? 'Oppretter...' : 'Opprett Kunde'}
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default memo(CustomerForm);
