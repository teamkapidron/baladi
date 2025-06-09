'use client';

// Node Modules
import { memo, useState } from 'react';

// Components
import CategoryTree from './category-tree';
import ProductList from './product-list';

// Hooks
import { useProduct } from '@/hooks/useProduct';
import { useCategory } from '@/hooks/useCategory';
import { useProductFilters } from '@/hooks/useProduct/useProductFilters';

// Types
import type { HierarchicalCategory } from '@repo/types/category';

function CategoriesManagement() {
  const { products } = useProduct();
  const { categories } = useCategory();
  const { handleCategoryFilterChange } = useProductFilters();

  const [selectedCategory, setSelectedCategory] =
    useState<HierarchicalCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (category: HierarchicalCategory) => {
    handleCategoryFilterChange(category._id);
    setSelectedCategory(category);
  };

  const handleToggleProductActive = (productId: string, isActive: boolean) => {
    console.log('Toggle product active:', productId, isActive);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left Panel - Category Tree */}
      <div className="lg:col-span-4 xl:col-span-3">
        <CategoryTree
          categories={categories?.categories || []}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Right Panel - Product List */}
      <div className="lg:col-span-8 xl:col-span-9">
        <ProductList
          selectedCategory={selectedCategory}
          products={products?.products || []}
          onToggleProductActive={handleToggleProductActive}
        />
      </div>
    </div>
  );
}

export default memo(CategoriesManagement);
