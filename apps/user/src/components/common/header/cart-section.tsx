'use client';

// Node Modules
import Link from 'next/link';
import { ShoppingCart } from '@repo/ui/lib/icons';

// Components

function CartSection() {
  return (
    <div className="relative">
      <div className="relative flex cursor-pointer items-center text-[var(--baladi-dark)] hover:text-[var(--baladi-primary)]">
        <Link href="/cart">
          <ShoppingCart size={24} />
          {/* {count > 0 && (
            <span
              id="cart-count"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-accent)] text-xs font-medium text-white"
            >
              {count}
            </span>
          )} */}
        </Link>
      </div>

      {/* Cart tooltip - only show when there are items */}
      {/* {showCartTooltip && count > 0 && (
        <div
          className="sm:w-68 absolute right-0 z-50 mt-2 w-64 rounded-md border border-gray-100 bg-white shadow-lg"
          onMouseEnter={() => setShowCartTooltip(true)}
          onMouseLeave={() => setShowCartTooltip(false)}
        >
          <div className="p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--baladi-dark)]">
                Handlekurv
              </span>
              <span className="rounded-full bg-[var(--baladi-light)] px-2 py-0.5 text-xs font-bold text-[var(--baladi-primary)]">
                {count} {count === 1 ? 'vare' : 'varer'}
              </span>
            </div>

            <div className="mb-3 rounded-lg bg-gradient-to-r from-[var(--baladi-light)] to-white p-2">
              <div className="mb-0.5 text-xs text-[var(--baladi-muted-foreground)]">
                Totalt beløp:
              </div>
              <div className="flex items-center text-base font-bold text-[var(--baladi-primary)]">
                {isClient && !isLoading ? (
                  <>
                    <span className="mr-1">{cartTotal || 0}</span>
                    <span className="text-xs font-normal">kr</span>
                  </>
                ) : (
                  <span className="text-xs italic">Laster...</span>
                )}
              </div>
            </div>

            <button
              className="flex w-full items-center justify-center rounded-md bg-[var(--baladi-secondary)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--baladi-secondary-dark)]"
              onClick={() => {
                router.push('/cart');
                setShowCartTooltip(false);
              }}
            >
              <ShoppingCart size={14} className="mr-1.5" />
              Se handlekurv
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default CartSection;
