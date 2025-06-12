'use client';

// Node Modules
import { memo } from 'react';
import Link from 'next/link';
import { MapPin, Plus } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

interface AddressListHeaderProps {
  count: number;
}

function AddressListHeader(props: AddressListHeaderProps) {
  const { count } = props;

  return (
    <div className="mb-8">
      <div className="mb-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="from-baladi-primary to-baladi-secondary flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg">
            <MapPin className="text-primary h-8 w-8" />
          </div>
          <div className="text-left">
            <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold text-gray-900">
              Mine adresser
            </h1>
            <p className="font-[family-name:var(--font-dm-sans)] text-gray-600">
              {count === 0
                ? 'Ingen adresser registrert'
                : `${count} ${count === 1 ? 'adresse' : 'adresser'} registrert`}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/address/new">
            <Button
              size="lg"
              className="group rounded-xl font-[family-name:var(--font-dm-sans)] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Plus className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Legg til ny adresse
            </Button>
          </Link>
        </div>
      </div>

      {count > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-sora)] font-semibold text-gray-900">
                  Leveringsadresser
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-gray-600">
                  Administrer dine leveringsadresser
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-sm font-bold text-blue-600">⭐</span>
              </div>
              <div>
                <p className="font-[family-name:var(--font-sora)] font-semibold text-gray-900">
                  Standard adresse
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-gray-600">
                  Velg din hovedadresse
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <span className="text-sm font-bold text-purple-600">🚚</span>
              </div>
              <div>
                <p className="font-[family-name:var(--font-sora)] font-semibold text-gray-900">
                  Rask levering
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-gray-600">
                  Oppbevar flere adresser
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(AddressListHeader);
