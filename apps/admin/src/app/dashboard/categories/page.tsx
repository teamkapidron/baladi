import { Suspense } from 'react';

import CategoriesHeader from '@/components/dashboard/categories/categories-header';
import CategoriesManagement from '@/components/dashboard/categories/categories-management/categories-management';

export default function CategoriesPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <CategoriesHeader />
        <CategoriesManagement />
      </div>
    </Suspense>
  );
}
