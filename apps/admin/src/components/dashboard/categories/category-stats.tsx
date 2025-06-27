'use client';

// Node Modules
import { memo, useState } from 'react';

// Components
import CategoryMetricCards from './category-metric-cards';
import CategoriesHeader, { SelectedCategory } from './categories-header';

// Hooks
import { useCategory } from '@/hooks/useCategory';

// Types

function CategoryStats() {
  const { categoryGraphDataQuery } = useCategory();
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory | null>(null);

  const handleCategoryChange = (category: SelectedCategory | null) => {
    setSelectedCategory(category);
  };

  const currentCategory = selectedCategory ?? {
    _id: 'all',
    categoryName: 'Alle kategorier',
    totalRevenue: categoryGraphDataQuery.data?.combinedRevenue ?? 0,
    grossProfit: categoryGraphDataQuery.data?.combinedProfit ?? 0,
    totalWastageQuantity:
      categoryGraphDataQuery.data?.combinedWastageQuantity ?? 0,
    totalWastageAmount: categoryGraphDataQuery.data?.combinedWastageAmount ?? 0,
    totalValue: 0,
  };

  return (
    <div className="space-y-6">
      <CategoriesHeader
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categoryGraphData={categoryGraphDataQuery.data}
      />
      <CategoryMetricCards selectedCategory={currentCategory} />
    </div>
  );
}

export default memo(CategoryStats);
