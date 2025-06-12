import { Suspense } from 'react';
import { Metadata } from 'next';

import Header from '@/components/common/header/header';
import CartContent from '@/components/cart/cart-content';
import CartSummary from '@/components/cart/cart-summary';
import Footer from '@/components/common/footer/footer';

export const metadata: Metadata = {
  title: 'Handlekurv',
};

export default function CartPage() {
  return (
    <Suspense>
      <div className="flex min-h-screen flex-col bg-[var(--baladi-background)]">
        <Header />
        <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-dark)] md:text-4xl">
              Handlekurv
            </h1>
            <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
              Gjennomgå og fullfør din bestilling
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CartContent />
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
