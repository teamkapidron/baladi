'use client';

// Node Modules
import { memo, useMemo } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Package, Info } from '@repo/ui/lib/icons';

// Components
import LogoSection from './logo-section';
import SearchSection from './search-section';
import CartSection from './cart-section';
import ProfileSection from './profile-section';

// Hooks
import { useCart } from '@/hooks/useCart';
import { useScrollDirection } from '@repo/ui/hooks/useScrollDirection';

function Header() {
  const { isVisible } = useScrollDirection({
    hideThreshold: 200,
    showAtTopThreshold: 10,
  });

  const { userCartItems } = useCart();

  const { totalWeight, totalVolume } = useMemo(() => {
    const totalWeight = userCartItems.reduce(
      (acc, item) => acc + (item.product.weight || 0) * item.quantity,
      0,
    );
    const totalVolume = userCartItems.reduce(
      (acc, item) =>
        acc +
        (item.product.dimensions?.length || 0) *
          (item.product.dimensions?.width || 0) *
          (item.product.dimensions?.height || 0) *
          item.quantity,
      0,
    );

    return { totalWeight, totalVolume };
  }, [userCartItems]);

  return (
    <div
      className={cn(
        'sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className="bg-white">
        <div className="border-b border-[var(--baladi-border)] bg-[var(--baladi-primary)]/80 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-2 text-center">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 flex-shrink-0" />
                <div className="flex flex-col text-xs sm:flex-row sm:items-center sm:gap-4 sm:text-sm">
                  <div className="flex items-center gap-1">
                    <Info className="h-3 w-3 flex-shrink-0" />
                    <span className="font-[family-name:var(--font-sora)] font-semibold">
                      Palltyper og dimensjoner
                    </span>
                  </div>
                  <div className="hidden text-white/60 sm:block">•</div>
                  <div className="flex flex-col font-[family-name:var(--font-dm-sans)] sm:flex-row sm:gap-4">
                    <span className="text-white/90">
                      <strong>Europall:</strong> 220 cm = 1,92 m³
                    </span>
                    <span className="text-white/90">
                      <strong>Stor pall:</strong> 220 cm = 2,4 m³
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-[var(--baladi-border)] bg-white/95 shadow-sm backdrop-blur-md">
        <header className="w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between lg:h-20">
              <div className="flex items-center">
                <LogoSection />
              </div>

              <div className="mx-8 hidden max-w-2xl flex-1 lg:flex">
                <SearchSection />
              </div>

              <div className="flex items-center space-x-4">
                {userCartItems.length > 0 && (
                  <>
                    <div className="hidden items-center gap-3 rounded-lg border border-[var(--baladi-primary)]/20 bg-[var(--baladi-primary)]/10 px-3 py-2 lg:flex">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded bg-[var(--baladi-primary)]/10 px-2 py-1 font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-primary)]">
                          {totalWeight.toFixed(2)} kg
                        </span>
                        <span className="rounded bg-[var(--baladi-secondary)]/10 px-2 py-1 font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-secondary)]">
                          {(totalVolume / 1000000).toFixed(3)} m³
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-xs lg:hidden">
                      <span className="rounded bg-[var(--baladi-primary)]/10 px-1.5 py-0.5 font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-primary)]">
                        {totalWeight.toFixed(1)}kg
                      </span>
                      <span className="rounded bg-[var(--baladi-secondary)]/10 px-1.5 py-0.5 font-[family-name:var(--font-dm-sans)] font-medium text-[var(--baladi-secondary)]">
                        {(totalVolume / 1000000).toFixed(3)}m³
                      </span>
                    </div>
                  </>
                )}
                <CartSection />
                <ProfileSection />
              </div>
            </div>

            <div className="border-t border-[var(--baladi-border)] py-3 lg:hidden">
              <SearchSection />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default memo(Header);
