import { Metadata } from 'next';
import { Suspense } from 'react';

import CategoryTree from '@/components/dashboard/categories/category-tree/category-tree';
import ProductList from '@/components/dashboard/categories/product-list/product-list';
import CategoryStats from '@/components/dashboard/categories/category-stats';

export const metadata: Metadata = {
  title: 'Kategorier',
};

export default function CategoriesPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <CategoryStats />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 xl:col-span-3">
            <CategoryTree />
          </div>

          <div className="lg:col-span-8 xl:col-span-9">
            <ProductList />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
