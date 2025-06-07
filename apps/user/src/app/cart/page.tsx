import Header from '@/components/common/header/header';
import Footer from '@/components/common/footer/footer';

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background-light)]">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-[var(--color-text)] md:text-3xl">
          Handlekurv
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">{/* <CartContent /> */}</div>
          <div className="lg:col-span-1">{/* <OrderSummary /> */}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
