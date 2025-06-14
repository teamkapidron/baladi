'use client';

// Node Modules
import React, { memo, useState } from 'react';
import { z, zodResolver, useForm } from '@repo/ui/lib/form';
import {
  Users,
  Plus,
  Mail,
  Shield,
  Clock,
  Crown,
  UserCheck,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';

import {
  Card,
  CardContent,
  CardDescription,
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';

import { Badge } from '@repo/ui/components/base/badge';
import { useSettings } from '@/hooks/useSettings';

// Admin creation form schema
const adminCreationSchema = z.object({
  name: z
    .string()
    .min(1, 'Fullt navn er påkrevd')
    .min(2, 'Navn må være minst 2 tegn'),
  email: z
    .string()
    .min(1, 'E-postadresse er påkrevd')
    .email('Ugyldig e-postadresse'),
});

type AdminCreationFormData = z.infer<typeof adminCreationSchema>;

function AdminTab() {
  const [showAddForm, setShowAddForm] = useState(false);

  const { createAdminMutation, getAllAdminsQuery } = useSettings();
  const { data: admins } = getAllAdminsQuery;

  const form = useForm<AdminCreationFormData>({
    resolver: zodResolver(adminCreationSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = async (data: AdminCreationFormData) => {
    createAdminMutation.mutate(data);
    form.reset();
    setShowAddForm(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return <Crown className="mr-1 h-3 w-3" />;
      case 'Admin':
        return <Shield className="mr-1 h-3 w-3" />;
      default:
        return <UserCheck className="mr-1 h-3 w-3" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border-purple-200';
      case 'Admin':
        return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="via-[var(--baladi-light)]/20 relative overflow-hidden rounded-2xl border border-[var(--baladi-border)] bg-gradient-to-br from-white to-blue-50/30 p-8 shadow-sm">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500"></div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[var(--baladi-primary)]"></div>
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
                  Administrator oversikt
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                  Administrer systemadministratorer og deres tilganger
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-emerald-700">
                  {admins?.admins.length} Aktive
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="h-12 bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] px-6 font-[family-name:var(--font-dm-sans)] font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            <Plus className="mr-2 h-5 w-5" />
            Legg til administrator
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card className="border-[var(--baladi-border)] shadow-lg">
          <CardHeader className="border-b border-[var(--baladi-border)] bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-3 font-[family-name:var(--font-sora)] text-xl text-[var(--baladi-dark)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Plus className="h-5 w-5 text-emerald-600" />
              </div>
              Legg til ny administrator
            </CardTitle>
            <CardDescription className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
              Fyll ut informasjonen nedenfor for å legge til en ny administrator
              til systemet
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                          Fullt navn
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Skriv inn fullt navn"
                            className="h-12 font-[family-name:var(--font-dm-sans)]"
                            iconLeft={
                              <Users className="h-5 w-5 text-[var(--baladi-gray)]" />
                            }
                          />
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
                        <FormLabel className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                          E-postadresse
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Skriv inn e-postadresse"
                            className="h-12 font-[family-name:var(--font-dm-sans)]"
                            iconLeft={
                              <Mail className="h-5 w-5 text-[var(--baladi-gray)]" />
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-blue-800">
                        Sikkerhetsnotat
                      </h4>
                      <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-blue-700">
                        Den nye administratoren vil motta en e-post med
                        instruksjoner for å sette opp sitt passord.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-[var(--baladi-border)] pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      form.reset();
                    }}
                    className="h-12 px-6 font-[family-name:var(--font-dm-sans)]"
                  >
                    Avbryt
                  </Button>
                  <Button
                    type="submit"
                    disabled={createAdminMutation?.isPending}
                    className="h-12 bg-gradient-to-r from-emerald-500 to-green-500 px-6 font-[family-name:var(--font-dm-sans)] font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <UserCheck className="mr-2 h-5 w-5" />
                    {createAdminMutation?.isPending
                      ? 'Legger til...'
                      : 'Legg til administrator'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <Card className="border-[var(--baladi-border)] shadow-lg">
        <CardHeader className="border-b border-[var(--baladi-border)] bg-gradient-to-r from-gray-50 to-slate-50">
          <CardTitle className="flex items-center gap-3 font-[family-name:var(--font-sora)] text-xl text-[var(--baladi-dark)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
              <Users className="h-5 w-5 text-slate-600" />
            </div>
            Alle administratorer ({admins?.admins.length})
          </CardTitle>
          <CardDescription className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
            Komplett oversikt over alle registrerte administratorer i systemet
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-slate-50 hover:bg-gray-50">
                  <TableHead className="h-14 font-[family-name:var(--font-dm-sans)] font-bold text-[var(--baladi-dark)]">
                    Administrator
                  </TableHead>
                  <TableHead className="h-14 font-[family-name:var(--font-dm-sans)] font-bold text-[var(--baladi-dark)]">
                    Rolle
                  </TableHead>
                  <TableHead className="h-14 font-[family-name:var(--font-dm-sans)] font-bold text-[var(--baladi-dark)]">
                    Status
                  </TableHead>
                  <TableHead className="h-14 font-[family-name:var(--font-dm-sans)] font-bold text-[var(--baladi-dark)]">
                    Opprettet kl
                  </TableHead>
                  <TableHead className="h-14 w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins?.admins.map((admin, index) => (
                  <TableRow
                    key={admin._id}
                    className="hover:bg-[var(--baladi-light)]/30 border-b border-[var(--baladi-border)] transition-colors"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)] text-white shadow-md">
                          <span className="font-[family-name:var(--font-sora)] text-sm font-bold">
                            {admin.name.charAt(0)}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
                            {admin.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-[var(--baladi-gray)]" />
                            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                              {admin.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div
                        className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${getRoleColor('Admin')}`}
                      >
                        {getRoleIcon('Admin')}
                        {'Admin'}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${'bg-emerald-500'}`}
                        ></div>
                        <Badge
                          variant={'default'}
                          className="font-[family-name:var(--font-dm-sans)] font-medium"
                        >
                          {'Aktiv'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[var(--baladi-gray)]" />
                        <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                          {new Date(admin.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(AdminTab);
