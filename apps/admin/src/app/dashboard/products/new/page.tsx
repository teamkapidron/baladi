import { Metadata } from 'next';
import { Suspense } from 'react';

import ProductForm from '@/components/dashboard/products/product-form/product-form';

export const metadata: Metadata = {
  title: 'Legg til produkt',
};

export default function NewProductPage() {
  return (
    <Suspense>
      <div className="bg-background rounded-xl p-5 shadow-md">
        <ProductForm />
      </div>
    </Suspense>
  );
}
