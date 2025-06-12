import { Suspense } from 'react';
import { Metadata } from 'next';

import Header from '@/components/common/header/header';
import ProductBreadcrumb from '@/components/product/product-detail/product-breadcrumb';
import ProductGallery from '@/components/product/product-detail/product-gallery';
import ProductInfo from '@/components/product/product-detail/product-info';
import ProductSpecifications from '@/components/product/product-detail/product-specifications';
import RelatedProducts from '@/components/product/product-detail/related-products';
import Footer from '@/components/common/footer/footer';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Produktdetaljer | Baladi Engros`,
    description:
      'Se produktdetaljer og spesifikasjoner for våre autentiske asiatiske og orientalske ingredienser.',
  };
}

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <Suspense>
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <ProductBreadcrumb />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ProductGallery />
              <ProductInfo />
            </div>
            <ProductSpecifications />
            <RelatedProducts />
          </div>
        </main>
      </Suspense>

      <Footer />
    </div>
  );
}
