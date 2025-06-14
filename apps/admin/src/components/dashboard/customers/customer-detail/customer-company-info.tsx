'use client';

// Node Modules
import React, { memo } from 'react';
import { Building, Hash, MapPin, FileText } from '@repo/ui/lib/icons';

// Components
import { Card } from '@repo/ui/components/base/card';
import { Input } from '@repo/ui/components/base/input';

// Hooks
import { useUserDetails } from '@/hooks/useUsers';

// Types/Utils
import { formatDate } from '@repo/ui/lib/date';

interface CustomerCompanyInfoProps {
  customerId: string;
}

function CustomerCompanyInfo(props: CustomerCompanyInfoProps) {
  const { customerId } = props;

  const { userDetailsQuery } = useUserDetails(customerId);
  const user = userDetailsQuery.data?.user;

  if (userDetailsQuery.isLoading) {
    return <CompanyInfoSkeleton />;
  }

  return (
    <Card className="relative overflow-hidden border border-[var(--baladi-border)] bg-gradient-to-br from-white via-[var(--baladi-light)] to-white shadow-lg">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[var(--baladi-accent)]"></div>
        <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-[var(--baladi-primary)]"></div>
        <div className="absolute right-1/4 top-1/3 h-28 w-28 rounded-full bg-[var(--baladi-secondary)]"></div>
      </div>

      <div className="relative">
        <div className="h-1 w-full bg-gradient-to-r from-[var(--baladi-accent)] via-[var(--baladi-primary)] to-[var(--baladi-secondary)]"></div>

        <div className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
              Bedriftsinformasjon
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Oversikt over kundens bedriftsdetaljer og kontaktinformasjon
            </p>
          </div>
        </div>
      </div>

      <div className="relative px-6 pb-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CompanyInfoField
            icon={Building}
            label="Bedriftsnavn"
            value={user?.companyName || 'Ikke oppgitt'}
          />

          <CompanyInfoField
            icon={Hash}
            label="Organisasjonsnummer"
            value={user?.organizationNumber || 'Ikke oppgitt'}
            className="font-mono"
          />

          <CompanyInfoField
            icon={MapPin}
            label="Adresse"
            value={user?.address || 'Ingen adresse oppgitt'}
            className="md:col-span-2"
          />

          <div className="md:col-span-2">
            <div className="border-[var(--baladi-border)]/30 mt-4 rounded-xl border bg-gradient-to-r from-[var(--baladi-light)] to-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--baladi-info)] to-blue-600 shadow-sm">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
                  Tilleggsinformasjon
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div className="space-y-1">
                  <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-gray)]">
                    Kontotype:
                  </span>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)]">
                    {user?.userType || 'Ukjent'}
                  </p>
                </div>
                {user?.createdAt && (
                  <div className="space-y-1">
                    <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-gray)]">
                      Registrert:
                    </span>
                    <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)]">
                      {formatDate(new Date(user.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default memo(CustomerCompanyInfo);

interface CompanyInfoFieldProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
}

function CompanyInfoField({
  icon: Icon,
  label,
  value,
  className = '',
}: CompanyInfoFieldProps) {
  return (
    <div className={`group space-y-3 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--baladi-accent)] to-orange-600 shadow-sm transition-transform duration-200 group-hover:scale-110">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <label className="font-[family-name:var(--font-sora)] text-sm font-semibold text-[var(--baladi-dark)]">
          {label}
        </label>
      </div>

      <Input
        type="text"
        defaultValue={value}
        className={`focus:ring-[var(--baladi-accent)]/20 border-[var(--baladi-border)] bg-white/80 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)] backdrop-blur-sm transition-all duration-200 focus:border-[var(--baladi-accent)] focus:bg-white focus:shadow-lg ${className.includes('font-mono') ? 'font-mono' : ''}`}
      />

      <div className="border-[var(--baladi-border)]/50 group relative overflow-hidden rounded-lg border bg-gradient-to-r from-white to-[var(--baladi-light)] p-3 transition-all duration-200 hover:border-[var(--baladi-border)] hover:shadow-md">
        <div className="from-[var(--baladi-accent)]/5 absolute inset-0 bg-gradient-to-r to-orange-500/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
        <p
          className={`relative font-[family-name:var(--font-dm-sans)] text-[var(--baladi-dark)] ${className.includes('font-mono') ? 'font-mono' : ''}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function CompanyInfoSkeleton() {
  return (
    <Card className="bg-white shadow-lg">
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-48 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`space-y-3 ${i === 2 ? 'md:col-span-2' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                </div>
                <div
                  className={`${i === 2 ? 'h-20' : 'h-10'} w-full rounded-lg bg-gray-200`}
                ></div>
              </div>
            ))}
          </div>
          <div className="h-24 w-full rounded-xl bg-gray-200"></div>
        </div>
      </div>
    </Card>
  );
}
