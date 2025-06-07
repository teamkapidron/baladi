import React, { useMemo, useCallback, memo, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Coffee,
  IceCream2,
  Cookie,
  Beef,
  Utensils,
  RefreshCw,
} from '@repo/ui/lib/icons';

import { Input } from '@repo/ui/components/base/input';
import { Checkbox } from '@repo/ui/components/base/checkbox';

function ProductsSidebar() {
  const [stockFilter, setStockFilter] = useState<'inStock' | 'outOfStock'>(
    'inStock',
  );

  const getCategoryIcon = useCallback((categoryId: string) => {
    switch (categoryId) {
      case 'cat1':
        return (
          <Package size={16} className="mr-1.5 text-[var(--color-primary)]" />
        );
      case 'cat2':
        return (
          <IceCream2 size={16} className="mr-1.5 text-[var(--color-primary)]" />
        );
      case 'cat3':
        return (
          <Cookie size={16} className="mr-1.5 text-[var(--color-primary)]" />
        );
      case 'cat4':
        return (
          <Coffee size={16} className="mr-1.5 text-[var(--color-primary)]" />
        );
      case 'cat5':
        return (
          <Beef size={16} className="mr-1.5 text-[var(--color-primary)]" />
        );
      case 'cat6':
        return (
          <Utensils size={16} className="mr-1.5 text-[var(--color-primary)]" />
        );
      default:
        return (
          <Package size={16} className="mr-1.5 text-[var(--color-primary)]" />
        );
    }
  }, []);

  const categories = useMemo(() => {
    return [
      { _id: 'cat1', name: 'Produkter' },
      { _id: 'cat2', name: 'Produkter' },
      { _id: 'cat3', name: 'Produkter' },
    ];
  }, []);

  const categoriesList = useMemo(
    () => (
      <ul className="no-scrollbar max-h-[250px] space-y-0.5 overflow-y-auto pr-2">
        <li>
          <Link
            href="/products"
            className={`flex items-center rounded-md px-2 py-1.5 text-sm transition-all duration-300 ease-in-out ${'bg-[var(--color-primary-light)] font-medium text-[var(--color-primary)]'}`}
          >
            <Package size={16} className="mr-1.5" />
            <span>Alle Produkter</span>
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              href={`/products?category=${category._id}`}
              className={`flex items-center rounded-md px-2 py-1.5 text-sm transition-all duration-300 ease-in-out ${'bg-[var(--color-primary-light)] font-medium text-[var(--color-primary)]'}`}
            >
              {getCategoryIcon(category._id)}
              <span>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    ),
    [categories, getCategoryIcon],
  );

  const handleStockFilterChange = (value: 'inStock' | 'outOfStock') => {
    setStockFilter(value);
    console.log('Stock filter changed:', value);
  };

  const stockFilterSection = useMemo(() => {
    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={stockFilter === 'inStock'}
            onCheckedChange={() => handleStockFilterChange('inStock')}
          />
          <label
            htmlFor="in-stock"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            På lager
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="out-of-stock"
            checked={stockFilter === 'outOfStock'}
            onCheckedChange={() => handleStockFilterChange('outOfStock')}
          />
          <label
            htmlFor="out-of-stock"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Utsolgt
          </label>
        </div>
      </div>
    );
  }, [stockFilter]);

  const priceRangeSection = useMemo(() => {
    const handlePriceChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      type: 'minPrice' | 'maxPrice',
    ) => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value)) {
        // updateFilter(type, value);
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="min-price"
            className="text-sm font-medium text-[var(--color-text)]"
          >
            Minste Pris (kr)
          </label>
          <Input
            id="min-price"
            type="number"
            min="0"
            value={0}
            onChange={(e) => handlePriceChange(e, 'minPrice')}
            className="w-full border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="max-price"
            className="text-sm font-medium text-[var(--color-text)]"
          >
            Høyeste Pris (kr)
          </label>
          <Input
            id="max-price"
            type="number"
            min="0"
            value={0}
            onChange={(e) => handlePriceChange(e, 'maxPrice')}
            className="w-full border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>
      </div>
    );
  }, []);

  const resetButton = useMemo(
    () => (
      <button
        onClick={() => {}}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:bg-gray-200"
      >
        <RefreshCw className="h-4 w-4" />
        Tilbakestill Filter
      </button>
    ),
    [],
  );

  return (
    <div className="hidden w-full min-w-[220px] flex-shrink-0 bg-transparent md:block">
      <div className="sticky top-24 rounded-md border border-gray-200 bg-white p-4">
        <div className="mb-4 pb-4">
          <h3 className="mb-3 text-base font-medium text-[var(--color-primary)]">
            Kategorier
          </h3>
          {categoriesList}
        </div>

        <div className="mb-4 border-b border-gray-200 pb-4">
          <h3 className="mb-3 text-base font-medium text-[var(--color-primary)]">
            Lagerstatus
          </h3>
          {stockFilterSection}
        </div>

        <div className="mb-4 pb-4">
          <h3 className="mb-3 text-base font-medium text-[var(--color-primary)]">
            Prisklasse
          </h3>
          {priceRangeSection}
        </div>

        <div className="pt-2">{resetButton}</div>
      </div>
    </div>
  );
}

export default memo(ProductsSidebar);
