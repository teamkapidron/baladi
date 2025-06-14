'use client';

// Node Modules
import React, { memo } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Package, Star } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

function EmptyOrderState() {
  return (
    <div className="py-16 text-center">
      <div className="to-[var(--baladi-primary)]/10 mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[var(--baladi-light)]">
        <div className="relative">
          <ShoppingBag size={48} className="text-[var(--baladi-primary)]" />
          <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--baladi-secondary)]">
            <Package size={12} className="text-white" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-md space-y-4">
        <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
          Ingen bestillinger ennå
        </h2>
        <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
          Du har ikke lagt inn noen bestillinger hos Baladi Engros ennå. Utforsk
          vårt store utvalg av kvalitetsprodukter for din virksomhet.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="bg-[var(--baladi-primary)]/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full">
              <Package size={20} className="text-[var(--baladi-primary)]" />
            </div>
            <h3 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
              Stort utvalg
            </h3>
            <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Tusenvis av produkter for din virksomhet
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="bg-[var(--baladi-secondary)]/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full">
              <Star size={20} className="text-[var(--baladi-secondary)]" />
            </div>
            <h3 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
              Beste kvalitet
            </h3>
            <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Kun utvalgte produkter av høy kvalitet
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="bg-[var(--baladi-accent)]/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full">
              <ArrowRight size={20} className="text-[var(--baladi-accent)]" />
            </div>
            <h3 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
              Rask levering
            </h3>
            <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Levering på 3-5 virkedager
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Button asChild size="lg" className="px-8">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag size={18} />
            Start shopping
            <ArrowRight size={16} />
          </Link>
        </Button>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" asChild>
            <Link href="/categories">Se alle kategorier</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Utforsk produkter</Link>
          </Button>
        </div>
      </div>

      <div className="from-[var(--baladi-light)]/30 to-[var(--baladi-primary)]/5 mt-12 rounded-lg bg-gradient-to-r p-6">
        <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
          Trenger du hjelp?
        </h3>
        <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
          Vårt kundeserviceteam er klar til å hjelpe deg med å finne de riktige
          produktene for din virksomhet.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" size="sm">
            Ring oss: 22 33 44 55
          </Button>
          <Button variant="outline" size="sm">
            Send e-post: hjelp@baladi.no
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(EmptyOrderState);
