'use client';

import { memo, useState } from 'react';
import {
  ArrowUpDown,
  Edit,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Minus,
} from '@repo/ui/lib/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  image?: string;
};

function InventoryTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingStock, setEditingStock] = useState<{ [key: string]: number }>(
    {},
  );
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Coffee Beans (1kg)',
      sku: 'PCB-1KG-001',
      category: 'Beverages',
      currentStock: 45,
      minStock: 10,
      price: 29.99,
      status: 'in-stock',
      lastUpdated: '2024-01-15',
      trend: 'up',
    },
    {
      id: '2',
      name: 'Organic Honey (500g)',
      sku: 'OH-500G-002',
      category: 'Sweeteners',
      currentStock: 8,
      minStock: 15,
      price: 18.99,
      status: 'low-stock',
      lastUpdated: '2024-01-14',
      trend: 'down',
    },
    {
      id: '3',
      name: 'Artisan Chocolate Box',
      sku: 'ACB-DEL-003',
      category: 'Confectionery',
      currentStock: 0,
      minStock: 5,
      price: 34.99,
      status: 'out-of-stock',
      lastUpdated: '2024-01-13',
      trend: 'down',
    },
    {
      id: '4',
      name: 'Italian Olive Oil (750ml)',
      sku: 'IOO-750ML-004',
      category: 'Oils',
      currentStock: 23,
      minStock: 8,
      price: 24.99,
      status: 'in-stock',
      lastUpdated: '2024-01-16',
      trend: 'stable',
    },
    {
      id: '5',
      name: 'Gourmet Cheese Selection',
      sku: 'GCS-MIX-005',
      category: 'Dairy',
      currentStock: 3,
      minStock: 6,
      price: 42.99,
      status: 'low-stock',
      lastUpdated: '2024-01-12',
      trend: 'down',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'low-stock':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'out-of-stock':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            In Stock
          </div>
        );
      case 'low-stock':
        return (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
            Low Stock
          </div>
        );
      case 'out-of-stock':
        return (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
            Out of Stock
          </div>
        );
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStockProgressColor = (current: number, min: number) => {
    const percentage = (current / (min * 2)) * 100;
    if (percentage <= 25) return 'bg-red-500';
    if (percentage <= 50) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStockProgressWidth = (current: number, min: number) => {
    const percentage = Math.min((current / (min * 2)) * 100, 100);
    return `${percentage}%`;
  };

  const handleStockEdit = (productId: string, newStock: number) => {
    setEditingStock((prev) => ({ ...prev, [productId]: newStock }));
  };

  const handleStockSave = (productId: string) => {
    console.log(
      `Updating stock for product ${productId} to ${editingStock[productId]}`,
    );
    setEditingStock((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Beverages: 'bg-blue-100 text-blue-800 ring-blue-600/20',
      Sweeteners: 'bg-purple-100 text-purple-800 ring-purple-600/20',
      Confectionery: 'bg-pink-100 text-pink-800 ring-pink-600/20',
      Oils: 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
      Dairy: 'bg-green-100 text-green-800 ring-green-600/20',
    };
    return (
      colors[category as keyof typeof colors] ||
      'bg-gray-100 text-gray-800 ring-gray-600/20'
    );
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Inventory Overview
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage your product stock levels and monitor inventory status
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                className="w-72 rounded-xl border-gray-200 bg-white pl-12 pr-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                className="appearance-none rounded-xl border-gray-200 bg-white py-2.5 pl-11 pr-10 text-sm font-medium shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50">
              <TableHead className="px-8 py-4 text-left">
                <button className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-gray-900">
                  Product Details
                  <ArrowUpDown className="h-4 w-4 opacity-60" />
                </button>
              </TableHead>
              <TableHead className="px-4 py-4 text-left">
                <button className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-gray-900">
                  Category
                  <ArrowUpDown className="h-4 w-4 opacity-60" />
                </button>
              </TableHead>
              <TableHead className="px-4 py-4 text-left">
                <button className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-gray-900">
                  Stock Level
                  <ArrowUpDown className="h-4 w-4 opacity-60" />
                </button>
              </TableHead>
              <TableHead className="px-4 py-4 text-left font-semibold text-gray-700">
                Status
              </TableHead>
              <TableHead className="px-4 py-4 text-left">
                <button className="flex items-center gap-2 font-semibold text-gray-700 transition-colors hover:text-gray-900">
                  Price & Trend
                  <ArrowUpDown className="h-4 w-4 opacity-60" />
                </button>
              </TableHead>
              <TableHead className="px-4 py-4 text-left font-semibold text-gray-700">
                Last Updated
              </TableHead>
              <TableHead className="px-8 py-4 text-left font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className={`group border-b border-gray-50 transition-all duration-200 hover:bg-gray-50/50 ${
                  hoveredRow === product.id ? 'bg-blue-50/30' : ''
                }`}
                onMouseEnter={() => setHoveredRow(product.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <TableCell className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 ring-2 ring-blue-100 transition-all group-hover:ring-blue-200">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-white ring-2 ring-white">
                        {getTrendIcon(product.trend)}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold text-gray-900">
                        {product.name}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500">
                          SKU: {product.sku}
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ${getCategoryColor(product.category)}`}
                  >
                    {product.category}
                  </span>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="space-y-3">
                    {editingStock[product.id] !== undefined ? (
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            className="w-20 rounded-lg border-gray-200 px-3 py-2 text-sm font-medium shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={editingStock[product.id]}
                            onChange={(e) =>
                              handleStockEdit(
                                product.id,
                                parseInt(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleStockSave(product.id)}
                          className="h-8 rounded-lg bg-blue-600 px-4 text-xs font-medium text-white shadow-sm hover:bg-blue-700"
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            {product.currentStock}
                          </span>
                          <span className="text-sm text-gray-500">
                            / {product.minStock} min
                          </span>
                        </div>
                        <div className="w-24">
                          <div className="h-2 rounded-full bg-gray-200">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getStockProgressColor(
                                product.currentStock,
                                product.minStock,
                              )}`}
                              style={{
                                width: getStockProgressWidth(
                                  product.currentStock,
                                  product.minStock,
                                ),
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(product.status)}
                    {getStatusBadge(product.status)}
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(product.trend)}
                      <span
                        className={`text-xs font-medium ${
                          product.trend === 'up'
                            ? 'text-emerald-600'
                            : product.trend === 'down'
                              ? 'text-red-600'
                              : 'text-gray-500'
                        }`}
                      >
                        {product.trend === 'up'
                          ? '+5.2%'
                          : product.trend === 'down'
                            ? '-2.1%'
                            : 'Stable'}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="text-sm text-gray-600">
                    {formatDate(product.lastUpdated)}
                  </div>
                </TableCell>

                <TableCell className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleStockEdit(product.id, product.currentStock)
                      }
                      className="group/btn rounded-lg p-2 text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                      title="Edit Stock"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="group/btn rounded-lg p-2 text-gray-400 transition-all hover:bg-green-50 hover:text-green-600"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="group/btn rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600"
                      title="More Options"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Footer */}
      <div className="bg-gray-50 px-8 py-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing{' '}
            <span className="font-medium text-gray-900">{products.length}</span>{' '}
            products
          </div>
          <div className="flex items-center gap-4">
            <span>
              Total Value:{' '}
              <span className="font-bold text-gray-900">
                $
                {products
                  .reduce((sum, p) => sum + p.price * p.currentStock, 0)
                  .toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(InventoryTable);
