'use client';

import {
  ArrowUpDown,
  Eye,
  ImageIcon,
  Trash,
  EditIcon,
} from '@repo/ui/lib/icons';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';
import { Product } from '@repo/types/product';
import { useState } from 'react';

export function ProductTableContent() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: 'name' | 'salePrice' | 'stock' | 'salesCount' | null;
    direction: 'ascending' | 'descending' | null;
  }>({ key: null, direction: null });

  const toggleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === sortedProducts.length
        ? []
        : sortedProducts.map((product) => product._id),
    );
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSort = (key: 'name' | 'salePrice' | 'stock' | 'salesCount') => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key
          ? prev.direction === 'ascending'
            ? 'descending'
            : 'ascending'
          : 'ascending',
    }));
  };

  const handleDeleteClick = (productId: string, productName: string) => {
    console.log(`Deleting product: ${productName} (${productId})`);
  };

  const currentPage = 1;
  const itemsPerPage = 10;

  const currentPageData = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const isValidImageUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="relative">
      <div className="max-h-[600px] overflow-auto">
        <Table className="w-full border-none">
          <TableHeader className="border-none">
            <TableRow className="border-none">
              <TableHead className="bg-background sticky top-0 z-50 w-10 border-none p-3 text-left">
                <input
                  type="checkbox"
                  className="border-input bg-background h-4 w-4 cursor-pointer"
                  checked={
                    selectedProducts.length === sortedProducts.length &&
                    sortedProducts.length > 0
                  }
                  onChange={toggleSelectAll}
                  title="Select all products"
                  aria-label="Select all products"
                />
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                <button
                  onClick={() => handleSort('name')}
                  className="hover:text-foreground flex items-center gap-1"
                  title="Sort by product name"
                >
                  Product Name
                  <ArrowUpDown
                    className={`h-3.5 w-3.5 ${
                      sortConfig.key === 'name'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                <button
                  onClick={() => handleSort('salePrice')}
                  className="hover:text-foreground flex items-center gap-1"
                  title="Sort by price"
                >
                  Price
                  <ArrowUpDown
                    className={`h-3.5 w-3.5 ${
                      sortConfig.key === 'salePrice'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                <button
                  onClick={() => handleSort('stock')}
                  className="hover:text-foreground flex items-center gap-1"
                  title="Sort by stock"
                >
                  Stock
                  <ArrowUpDown
                    className={`h-3.5 w-3.5 ${
                      sortConfig.key === 'stock'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                Category
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                <button
                  onClick={() => handleSort('salesCount')}
                  className="hover:text-foreground flex items-center gap-1"
                  title="Sort by sales"
                >
                  Sales
                  <ArrowUpDown
                    className={`h-3.5 w-3.5 ${
                      sortConfig.key === 'salesCount'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-none">
            {currentPageData.map((product) => {
              const isSelected = selectedProducts.includes(product._id);
              return (
                <TableRow
                  key={product._id}
                  className={`${isSelected ? 'selected' : ''} border-none`}
                >
                  <TableCell className="border-none p-3">
                    <input
                      type="checkbox"
                      className="border-input bg-background h-4 w-4 cursor-pointer"
                      checked={isSelected}
                      onChange={() => toggleProductSelection(product._id)}
                      title={`Select ${product.name}`}
                      aria-label={`Select ${product.name}`}
                    />
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-muted flex h-10 w-10 items-center justify-center">
                        {product.images &&
                        product.images.length > 0 &&
                        isValidImageUrl(product.images[0]) ? (
                          <Image
                            src={product.images?.[0] || ''}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <ImageIcon className="text-muted-foreground h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-foreground font-medium">
                          {product.name}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          ID: {product._id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="font-medium">
                      ${product.salePrice?.toFixed(2) || '0.00'}
                      {product.vat > 0 && (
                        <span className="text-muted-foreground bg-muted ml-2 px-1.5 py-0.5 text-xs">
                          +{product.vat}% VAT
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div
                      className={`font-medium ${
                        product.stock === 0
                          ? 'text-destructive'
                          : product.stock < 10
                            ? 'text-amber-600'
                            : 'text-[var(--color-success)]'
                      }`}
                    >
                      {product.stock === 0
                        ? 'Out of Stock'
                        : product.stock < 10
                          ? `Low Stock (${product.stock})`
                          : product.stock}
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="flex flex-wrap gap-1">
                      {product.categories?.map(
                        (category: string, index: number) => (
                          <div
                            key={index}
                            className="bg-primary/10 text-primary inline-flex items-center px-2.5 py-0.5 text-xs font-medium"
                          >
                            {category}
                          </div>
                        ),
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="font-medium">{0}</div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="flex items-center space-x-2">
                      <a
                        href={`/dashboard/products/${product.slug}`}
                        className="text-muted-foreground hover:text-foreground p-1"
                        title="View Product"
                      >
                        <Eye className="h-4 w-4" />
                      </a>
                      <button
                        className="p-1 text-blue-500 hover:text-blue-600"
                        title="Edit Product"
                      >
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="text-destructive hover:text-destructive/80 p-1"
                        title="Delete Product"
                        onClick={() =>
                          handleDeleteClick(product._id, product.name)
                        }
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
