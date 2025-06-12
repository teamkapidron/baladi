'use client';

import React, { useCallback, memo } from 'react';
import { Grid3X3, RefreshCw } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Checkbox } from '@repo/ui/components/base/checkbox';
import { Slider } from '@repo/ui/components/base/slider';
import GetCategoryIcon from '@/components/common/get-category-icon';

// Hooks
import { useCategory } from '@/hooks/useCategory';
import { useProductFilters } from '@/hooks/useProduct/useProductFilters';

// Types
import { formatPrice } from '@/utils/price.util';
import { ProductStock } from '@/hooks/useProduct/types';

function ProductsSidebar() {
  const { categories, isCategoriesLoading } = useCategory();
  const {
    category: selectedCategory,
    handleCategoryChange,
    stock,
    handleStockChange,
    minPrice,
    maxPrice,
    handleMinPriceChange,
    handleMaxPriceChange,
  } = useProductFilters();

  const handleReset = useCallback(() => {
    handleStockChange(ProductStock.ALL);
    handleMinPriceChange(0);
    handleMaxPriceChange(0);
    handleCategoryChange('');
  }, [
    handleCategoryChange,
    handleStockChange,
    handleMinPriceChange,
    handleMaxPriceChange,
  ]);

  const handlePriceRangeChange = useCallback(
    (values: number[]) => {
      handleMinPriceChange(values[0] ?? 0);
      handleMaxPriceChange(values[1] ?? 0);
    },
    [handleMinPriceChange, handleMaxPriceChange],
  );

  return (
    <div className="hidden w-full min-w-[260px] max-w-[260px] flex-shrink-0 bg-transparent md:block">
      <div className="sticky top-24 rounded-lg border border-[var(--baladi-border)] bg-white p-5 shadow-sm">
        {/* ************************************ START: Categories Section ************************************ */}
        <div className="mb-6 border-b border-[var(--baladi-border)] pb-5">
          <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Kategorier
          </h3>
          {isCategoriesLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-full animate-pulse rounded-md bg-[var(--baladi-light)]"
                />
              ))}
            </div>
          ) : (
            <ul className="no-scrollbar max-h-[250px] space-y-1 overflow-y-auto pr-2">
              <li>
                <Button
                  variant="ghost"
                  onClick={() => handleCategoryChange('')}
                  className={`flex items-center rounded-lg px-3 py-2 font-[family-name:var(--font-dm-sans)] text-sm transition-all duration-200 ${
                    !selectedCategory
                      ? 'bg-[var(--baladi-light)] font-semibold text-[var(--baladi-primary)]'
                      : 'text-[var(--baladi-dark)] hover:bg-[var(--baladi-light)] hover:text-[var(--baladi-primary)]'
                  }`}
                >
                  <Grid3X3 size={16} className="mr-2.5" />
                  <span>Alle Produkter</span>
                </Button>
              </li>
              {categories?.categories.map((category) => (
                <li key={category._id}>
                  <Button
                    variant="ghost"
                    onClick={() => handleCategoryChange(category._id)}
                    className={`flex items-center rounded-lg px-3 py-2 font-[family-name:var(--font-dm-sans)] text-sm transition-all duration-200 ${
                      selectedCategory === category._id
                        ? 'bg-[var(--baladi-light)] font-semibold text-[var(--baladi-primary)]'
                        : 'text-[var(--baladi-dark)] hover:bg-[var(--baladi-light)] hover:text-[var(--baladi-primary)]'
                    }`}
                  >
                    <span className="mr-2.5">
                      <GetCategoryIcon categoryName={category.name} />
                    </span>
                    <span className="truncate">{category.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* ************************************ END: Categories Section ************************************ */}

        {/* ************************************ START: Stock Status Section ************************************ */}
        <div className="mb-6 border-b border-[var(--baladi-border)] pb-5">
          <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Lagerstatus
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="in-stock"
                checked={stock === ProductStock.IN_STOCK}
                onCheckedChange={() => handleStockChange(ProductStock.IN_STOCK)}
                className="border-[var(--baladi-border)] data-[state=checked]:bg-[var(--baladi-primary)]"
              />
              <label
                htmlFor="in-stock"
                className="cursor-pointer font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)] transition-colors hover:text-[var(--baladi-primary)]"
              >
                På lager
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="out-of-stock"
                checked={stock === ProductStock.OUT_OF_STOCK}
                onCheckedChange={() =>
                  handleStockChange(ProductStock.OUT_OF_STOCK)
                }
                className="border-[var(--baladi-border)] data-[state=checked]:bg-[var(--baladi-primary)]"
              />
              <label
                htmlFor="out-of-stock"
                className="cursor-pointer font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)] transition-colors hover:text-[var(--baladi-primary)]"
              >
                Utsolgt
              </label>
            </div>
          </div>
        </div>
        {/* ************************************ END: Stock Status Section ************************************ */}

        {/* ************************************ START: Price Range Section ************************************ */}
        <div className="mb-6 pb-5">
          <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            Prisklasse
          </h3>
          <div className="space-y-4">
            {/* Price Display */}
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-[var(--baladi-light)] px-3 py-2">
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  {formatPrice(minPrice)} kr
                </span>
              </div>
              <div className="mx-2 h-px flex-1 bg-[var(--baladi-border)]" />
              <div className="rounded-lg bg-[var(--baladi-light)] px-3 py-2">
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  {(maxPrice ?? 0) === 0 ? '∞' : `${formatPrice(maxPrice)} kr`}
                </span>
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="px-2">
              <div className="relative">
                <Slider
                  value={[minPrice ?? 0, maxPrice ?? 10000]}
                  onValueChange={handlePriceRangeChange}
                  min={0}
                  max={10000}
                  step={50}
                  className="[&_[data-slot=slider-thumb]]:hover:ring-[var(--baladi-primary)]/20 w-full [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-[var(--baladi-primary)] [&_[data-slot=slider-range]]:to-[var(--baladi-secondary)] [&_[data-slot=slider-thumb]]:border-[var(--baladi-primary)] [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-lg [&_[data-slot=slider-thumb]]:hover:shadow-xl [&_[data-slot=slider-thumb]]:hover:ring-2 [&_[data-slot=slider-track]]:bg-[var(--baladi-light)]"
                />
              </div>
            </div>

            {/* Quick Price Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePriceRangeChange([0, 1000])}
                className="border-[var(--baladi-border)] font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-dark)] transition-all duration-200 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-light)] hover:text-[var(--baladi-primary)]"
              >
                Under 1.000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePriceRangeChange([1000, 2500])}
                className="border-[var(--baladi-border)] font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-dark)] transition-all duration-200 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-light)] hover:text-[var(--baladi-primary)]"
              >
                1.000 - 2.500
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePriceRangeChange([2500, 5000])}
                className="border-[var(--baladi-border)] font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-dark)] transition-all duration-200 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-light)] hover:text-[var(--baladi-primary)]"
              >
                2.500 - 5.000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePriceRangeChange([5000, 10000])}
                className="border-[var(--baladi-border)] font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-dark)] transition-all duration-200 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-light)] hover:text-[var(--baladi-primary)]"
              >
                Over 5.000
              </Button>
            </div>
          </div>
        </div>
        {/* ************************************ END: Price Range Section ************************************ */}

        {/* ************************************ START: Reset Button ************************************ */}
        <div className="pt-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-2 border-[var(--baladi-border)] font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)] transition-all duration-200 hover:border-[var(--baladi-primary)] hover:bg-[var(--baladi-light)] hover:text-[var(--baladi-primary)]"
          >
            <RefreshCw className="h-4 w-4" />
            Tilbakestill Filter
          </Button>
        </div>
        {/* ************************************ END: Reset Button ************************************ */}
      </div>
    </div>
  );
}

export default memo(ProductsSidebar);
