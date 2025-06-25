'use client';

// Node Modules
import { memo, useMemo, useEffect } from 'react';
import { useForm, zodResolver, z } from '@repo/ui/lib/form';

// Icons
import { User, Building2, MapPin, Save, X } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/base/form';

// Types
import { editProfileSchema, UserWithAddress } from './schema';

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;

interface EditProfileFormProps {
  user: UserWithAddress;
  isEditing: boolean;
  isLoading?: boolean;
  onSubmit: (values: EditProfileFormValues) => void;
  onCancel?: () => void;
}

function EditProfileForm({
  user,
  isEditing,
  isLoading = false,
  onSubmit,
  onCancel,
}: EditProfileFormProps) {
  const defaultValues = useMemo(() => {
    if (!user) return {};

    return {
      name: user.name || '',
      companyName: user.companyName || '',
      organizationNumber: user.organizationNumber || '',
      phoneNumber: user.phoneNumber || '',
      addressLine1: user.address.addressLine1 || '',
      addressLine2: user.address.addressLine2 || '',
      city: user.address.city || '',
      postalCode: user.address.postalCode || '',
    };
  }, [user]);

  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues,
  });

  useEffect(() => {
    if (user && defaultValues) {
      form.reset(defaultValues);
    }
  }, [user, defaultValues, form, isEditing]);

  const handleSubmit = (values: EditProfileFormValues) => {
    onSubmit(values);
  };

  const handleCancel = () => {
    form.reset(defaultValues);
    onCancel?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card className="border-[var(--baladi-border)] shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-sora)] text-lg">
              <User className="h-5 w-5 text-[var(--baladi-primary)]" />
              Personlig informasjon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Fullt navn
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input
                          {...field}
                          placeholder="Skriv inn ditt fulle navn"
                          className="focus:ring-[var(--baladi-primary)]/20 h-11 border-[var(--baladi-border)] focus:border-[var(--baladi-primary)]"
                        />
                      ) : (
                        <div className="h-11 rounded-lg bg-[var(--baladi-muted)] px-3 py-2 text-sm">
                          {field.value || 'Ikke oppgitt'}
                        </div>
                      )}
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
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Telefonnummer
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input
                          {...field}
                          type="tel"
                          placeholder="+47 123 45 678"
                          className="focus:ring-[var(--baladi-primary)]/20 h-11 border-[var(--baladi-border)] focus:border-[var(--baladi-primary)]"
                        />
                      ) : (
                        <div className="h-11 rounded-lg bg-[var(--baladi-muted)] px-3 py-2 text-sm">
                          {field.value || 'Ikke oppgitt'}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--baladi-border)] shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-sora)] text-lg">
              <Building2 className="h-5 w-5 text-[var(--baladi-primary)]" />
              Bedriftsinformasjon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Bedriftsnavn
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input
                          {...field}
                          placeholder="Skriv inn bedriftsnavn"
                          className="focus:ring-[var(--baladi-primary)]/20 h-11 border-[var(--baladi-border)] focus:border-[var(--baladi-primary)]"
                        />
                      ) : (
                        <div className="h-11 rounded-lg bg-[var(--baladi-muted)] px-3 py-2 text-sm">
                          {field.value || 'Ikke oppgitt'}
                        </div>
                      )}
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
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Organisasjonsnummer
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input
                          {...field}
                          placeholder="f.eks. 123 456 789"
                          className="focus:ring-[var(--baladi-primary)]/20 h-11 border-[var(--baladi-border)] focus:border-[var(--baladi-primary)]"
                        />
                      ) : (
                        <div className="h-11 rounded-lg bg-[var(--baladi-muted)] px-3 py-2 text-sm">
                          {field.value || 'Ikke oppgitt'}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--baladi-border)] shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-sora)] text-lg">
              <MapPin className="h-5 w-5 text-[var(--baladi-primary)]" />
              Adresseinformasjon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Adresselinje 1
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input
                          {...field}
                          placeholder="f.eks. Storgata 1"
                          className="focus:ring-[var(--baladi-primary)]/20 h-11 border-[var(--baladi-border)] focus:border-[var(--baladi-primary)]"
                        />
                      ) : (
                        <div className="h-11 rounded-lg bg-[var(--baladi-muted)] px-3 py-2 text-sm">
                          {field.value || 'Ikke oppgitt'}
                        </div>
                      )}
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
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Adresselinje 2
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input
                          {...field}
                          placeholder="Leilighet, suite (valgfritt)"
                          className="focus:ring-[var(--baladi-primary)]/20 h-11 border-[var(--baladi-border)] focus:border-[var(--baladi-primary)]"
                        />
                      ) : (
                        <div className="h-11 rounded-lg bg-[var(--baladi-muted)] px-3 py-2 text-sm">
                          {field.value || 'Ikke oppgitt'}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      By
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input
                          {...field}
                          placeholder="f.eks. Oslo"
                          className="focus:ring-[var(--baladi-primary)]/20 h-11 border-[var(--baladi-border)] focus:border-[var(--baladi-primary)]"
                        />
                      ) : (
                        <div className="h-11 rounded-lg bg-[var(--baladi-muted)] px-3 py-2 text-sm">
                          {field.value || 'Ikke oppgitt'}
                        </div>
                      )}
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
                    <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Postnummer
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input
                          {...field}
                          placeholder="f.eks. 0150"
                          className="focus:ring-[var(--baladi-primary)]/20 h-11 border-[var(--baladi-border)] focus:border-[var(--baladi-primary)]"
                        />
                      ) : (
                        <div className="h-11 rounded-lg bg-[var(--baladi-muted)] px-3 py-2 text-sm">
                          {field.value || 'Ikke oppgitt'}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {isEditing && (
          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                className="h-11 border-[var(--baladi-border)] px-6 text-[var(--baladi-primary)] hover:scale-105 hover:bg-[var(--baladi-error)] hover:text-white hover:shadow-lg"
              >
                <X className="mr-2 h-4 w-4" />
                Avbryt
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] px-8 font-[family-name:var(--font-dm-sans)] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Lagrer...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Lagre endringer</span>
                </div>
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default memo(EditProfileForm);
