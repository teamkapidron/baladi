'use client';

// Node Modules
import Image from 'next/image';
import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  Package,
  CheckCircle,
  Tag,
  ShoppingBag,
  Search,
  X,
  Grid3X3,
  Flag,
  ChevronDown,
  Check,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import { Checkbox } from '@repo/ui/components/base/checkbox';
import { Badge } from '@repo/ui/components/base/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/base/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui/components/base/command';

// Hooks
import { useQuickSearchProduct } from '@/hooks/useProduct';
import { useCategory } from '@/hooks/useCategory';

// Constants
import { COUNTRIES } from '@/utils/constants';

interface PosterProductSelectionProps {
  selectedProducts: string[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
}

function PosterProductSelection(props: PosterProductSelectionProps) {
  const { selectedProducts, setSelectedProducts } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<string>('Frukt & grønnsaker');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [categoryPopoverOpen, setCategoryPopoverOpen] = useState(false);

  const { quickSearchProductQuery, handleSearch } = useQuickSearchProduct(
    '',
    selectedCategory,
  );
  const { categoriesFlattened } = useCategory();

  const categories = useMemo(() => {
    return categoriesFlattened?.categories ?? [];
  }, [categoriesFlattened]);

  const filteredCategories = useMemo(() => {
    if (!categorySearchQuery) return categories;
    return categories.filter((category) =>
      category.name.toLowerCase().includes(categorySearchQuery.toLowerCase()),
    );
  }, [categories, categorySearchQuery]);

  const products = useMemo(() => {
    return quickSearchProductQuery.data?.products ?? [];
  }, [quickSearchProductQuery.data, selectedCategory]);

  const selectedCount = selectedProducts.length;
  const maxSelection = 6;
  const canSelectMore = selectedCount < maxSelection;

  const toggleProductSelection = useCallback(
    (productId: string) => {
      setSelectedProducts((prev) => {
        if (prev.includes(productId)) {
          return prev.filter((id: string) => id !== productId);
        } else {
          if (prev.length < maxSelection) {
            return [...prev, productId];
          }
          return prev;
        }
      });
    },
    [setSelectedProducts, maxSelection],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      handleSearch(e.target.value);
    },
    [handleSearch],
  );

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value === 'all' ? '' : value);
    setCategoryPopoverOpen(false);
    setCategorySearchQuery('');
  }, []);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategory) return 'Frukt & grønnsaker';
    const category = categories.find((cat) => cat._id === selectedCategory);
    return category?.name || 'Frukt & grønnsaker';
  }, [selectedCategory, categories]);

  const getCountryInfo = useCallback((countryCode: string | undefined) => {
    const countryName = COUNTRIES[countryCode as keyof typeof COUNTRIES];

    return {
      code: countryCode ?? 'NO',
      name: countryName ?? 'Norge',
      flag: `https://flagsapi.com/${countryCode}/flat/64.png`,
    };
  }, []);

  return (
    <Card className="rounded-xl shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
              Velg Produkter for Plakat
            </CardTitle>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Velg produkter å fremheve i din plakat
            </p>
          </div>
          <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <ShoppingBag className="h-5 w-5 text-[var(--baladi-primary)]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div className="space-y-2">
          <label className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
            Kategori
          </label>
          <Popover
            open={categoryPopoverOpen}
            onOpenChange={setCategoryPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={categoryPopoverOpen}
                className="h-11 w-full justify-between font-normal"
              >
                <div className="flex items-center gap-2">
                  {selectedCategory ? (
                    <Tag className="h-4 w-4 text-[var(--baladi-primary)]" />
                  ) : (
                    <Grid3X3 className="h-4 w-4 text-[var(--baladi-gray)]" />
                  )}
                  {selectedCategoryName}
                </div>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Søk kategorier..."
                  value={categorySearchQuery}
                  onValueChange={setCategorySearchQuery}
                />
                <CommandList>
                  <CommandEmpty>Ingen kategorier funnet.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="all"
                      onSelect={() => handleCategoryChange('all')}
                      className="cursor-pointer"
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          !selectedCategory ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      <Grid3X3 className="mr-2 h-4 w-4 text-[var(--baladi-gray)]" />
                      Alle kategorier
                    </CommandItem>
                    {filteredCategories.map((category) => (
                      <CommandItem
                        key={category._id}
                        value={category.name}
                        onSelect={() => handleCategoryChange(category._id)}
                        className="cursor-pointer"
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            selectedCategory === category._id
                              ? 'opacity-100'
                              : 'opacity-0'
                          }`}
                        />
                        <Tag className="mr-2 h-4 w-4 text-[var(--baladi-primary)]" />
                        {category.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Product Search */}
        <div className="space-y-2">
          <label className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
            Søk produkter
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
            <Input
              type="text"
              placeholder="Søk etter produkter..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="h-11 pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 text-[var(--baladi-gray)] hover:text-[var(--baladi-dark)]"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
            Skriv minst 1 tegn for å begynne søket
          </p>
        </div>

        {selectedCount > 0 && (
          <Card
            className={`${
              selectedCount >= maxSelection
                ? 'border-[var(--baladi-warning)]/20 bg-[var(--baladi-warning)]/5'
                : 'border-[var(--baladi-success)]/20 bg-[var(--baladi-success)]/5'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`h-5 w-5 ${
                      selectedCount >= maxSelection
                        ? 'text-[var(--baladi-warning)]'
                        : 'text-[var(--baladi-success)]'
                    }`}
                  />
                  <span
                    className={`font-[family-name:var(--font-dm-sans)] text-sm font-medium ${
                      selectedCount >= maxSelection
                        ? 'text-[var(--baladi-warning)]'
                        : 'text-[var(--baladi-success)]'
                    }`}
                  >
                    {selectedCount} av {maxSelection} produkt
                    {selectedCount > 1 ? 'er' : ''} valgt for plakat
                  </span>
                </div>
                <Badge
                  variant={
                    selectedCount >= maxSelection ? 'destructive' : 'secondary'
                  }
                  className="text-xs"
                >
                  {selectedCount}/{maxSelection}
                </Badge>
              </div>
              {selectedCount >= maxSelection && (
                <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-warning)]">
                  Maksimalt antall produkter valgt. Fjern en for å velge en
                  annen.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {quickSearchProductQuery.isLoading && searchQuery && (
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="bg-[var(--baladi-primary)]/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Search className="h-8 w-8 animate-pulse text-[var(--baladi-primary)]" />
                </div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Søker etter produkter...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {products.map((product) => {
            const isSelected = selectedProducts.includes(product._id);
            const canSelect = isSelected || canSelectMore;
            const countryInfo = getCountryInfo(
              product.supplier?.countryOfOrigin,
            );

            return (
              <Card
                key={product._id}
                className={`transition-all duration-200 ${
                  canSelect
                    ? 'cursor-pointer hover:shadow-md'
                    : 'cursor-not-allowed opacity-60'
                } ${
                  isSelected
                    ? 'bg-[var(--baladi-primary)]/5 border-[var(--baladi-primary)]'
                    : canSelect
                      ? 'hover:border-[var(--baladi-primary)]/30'
                      : 'border-gray-200'
                }`}
                onClick={() => canSelect && toggleProductSelection(product._id)}
              >
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Checkbox
                        id={`product-${product._id}`}
                        checked={isSelected}
                        disabled={!canSelect}
                        onCheckedChange={() =>
                          canSelect && toggleProductSelection(product._id)
                        }
                        className="h-5 w-5"
                      />
                    </div>

                    <div className="bg-[var(--baladi-secondary)]/10 flex h-12 w-12 items-center justify-center rounded-lg">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded object-cover"
                          width={1000}
                          height={1000}
                        />
                      ) : (
                        <Package className="h-6 w-6 text-[var(--baladi-secondary)]" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <label
                            htmlFor={`product-${product._id}`}
                            className="line-clamp-2 cursor-pointer font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]"
                          >
                            {product.name}
                          </label>

                          <p className="mt-1 line-clamp-2 text-xs text-[var(--baladi-gray)]">
                            {product.shortDescription}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              <Tag className="mr-1 h-3 w-3" />
                              {product.categories?.name ?? 'Ukategorisert'}
                            </Badge>

                            {countryInfo && (
                              <Badge variant="outline" className="text-xs">
                                <Flag className="mr-1 h-3 w-3" />
                                <Image
                                  src={countryInfo.flag}
                                  alt={countryInfo.name}
                                  className="mr-1 h-3 w-4 object-cover"
                                  width={1000}
                                  height={1000}
                                />
                                {countryInfo.name}
                              </Badge>
                            )}

                            <Badge variant="outline" className="text-xs">
                              kr {product.salePrice}
                            </Badge>
                          </div>
                        </div>

                        {isSelected && (
                          <Badge className="ml-2 bg-[var(--baladi-primary)] text-white">
                            Valgt
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {products.length === 0 && !quickSearchProductQuery.isLoading && (
            <Card>
              <CardContent className="p-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="bg-[var(--baladi-gray)]/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    {searchQuery ? (
                      <Search className="h-8 w-8 text-[var(--baladi-gray)]" />
                    ) : (
                      <Package className="h-8 w-8 text-[var(--baladi-gray)]" />
                    )}
                  </div>
                  <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                    {searchQuery
                      ? 'Ingen produkter funnet'
                      : 'Søk etter produkter'}
                  </h4>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                    {searchQuery
                      ? `Ingen produkter matcher "${searchQuery}". Prøv et annet søkeord.`
                      : 'Bruk søkefeltet ovenfor for å finne produkter å fremheve i plakat'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {selectedCount > 0 && (
          <Card className="bg-[var(--baladi-light)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                    {selectedCount >= maxSelection
                      ? 'Plakat klar'
                      : 'Klar til å fremheve i plakat'}
                  </p>
                  <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                    {selectedCount} av {maxSelection} produkt
                    {selectedCount > 1 ? 'er' : ''} vil bli inkludert
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProducts([])}
                  className="hover:text-[var(--baladi-primary)]/80 text-[var(--baladi-primary)]"
                >
                  Fjern Valg
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(PosterProductSelection);
