'use client';

// Node Modules
import { memo, useCallback, useMemo, useState } from 'react';
import {
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  MoreHorizontal,
} from '@repo/ui/lib/icons';
import { formatDate } from '@repo/ui/lib/date';

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';
import { Input } from '@repo/ui/components/base/input';

// Hooks
import { useInventory } from '@/hooks/useInventory';
import { useInventoryFilters } from '@/hooks/useInventory/useInventoryFilters';

function InventoryTable() {
  const { inventoryQuery } = useInventory();
  const { search, status, handleSearchFilterChange, handleStatusFilterChange } =
    useInventoryFilters();

  const inventory = useMemo(() => {
    return inventoryQuery.data?.inventory ?? [];
  }, [inventoryQuery.data]);

  const [searchQuery, setSearchQuery] = useState<string>(search ?? '');

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      handleSearchFilterChange(e.target.value);
    },
    [handleSearchFilterChange],
  );

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Lageroversikt</h2>
            <p className="mt-1 text-sm text-gray-600">
              Administrer dine produktlagernivåer og overvåk lagerstatus
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Søk produkter..."
                className="w-72 rounded-xl border-gray-200 bg-white pl-12 pr-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Select value={status} onValueChange={handleStatusFilterChange}>
                <SelectTrigger className="w-full rounded-xl border-gray-200 bg-white py-2.5 pl-11 pr-10 text-sm font-medium shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Alle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle</SelectItem>
                  <SelectItem value="in-stock">På Lager</SelectItem>
                  <SelectItem value="low-stock">Lavt Lager</SelectItem>
                  <SelectItem value="out-of-stock">Tomt på Lager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50">
              <TableHead className="px-8 py-4 text-left">
                Produktdetaljer
              </TableHead>
              <TableHead className="px-4 py-4 text-left">Kategori</TableHead>
              <TableHead className="px-4 py-4 text-left">Lagernivå</TableHead>
              <TableHead className="px-4 py-4 text-left text-gray-700">
                Status
              </TableHead>
              <TableHead className="px-4 py-4 text-left">Pris</TableHead>
              <TableHead className="px-4 py-4 text-left text-gray-700">
                Utløpsdato
              </TableHead>
              <TableHead className="px-8 py-4 text-left text-gray-700">
                Handlinger
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow
                key={item._id}
                className="group border-b border-gray-50 transition-all duration-200 hover:bg-gray-50/50"
              >
                <TableCell className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 ring-2 ring-blue-100 transition-all group-hover:ring-blue-200">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold text-gray-900">
                        {item.productId.name}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500">
                          SKU: {item.productId.sku}
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ${getCategoryColor(item.productId.category)}`}
                  >
                    {item.productId.category}
                  </span>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <span className="text-sm text-gray-500">enheter</span>
                    </div>
                    <div className="w-24">
                      <div className="h-2 rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getStockProgressColor(
                            item.quantity,
                            item.expirationDate,
                          )}`}
                          style={{
                            width: getStockProgressWidth(
                              item.quantity,
                              item.expirationDate,
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.quantity, item.expirationDate)}
                    {getStatusBadge(item.quantity, item.expirationDate)}
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-gray-900">
                      {item.productId.price}kr
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-6">
                  <div className="text-sm text-gray-600">
                    {formatDate(item.expirationDate, 'MMM d, yyyy')}
                  </div>
                </TableCell>

                <TableCell className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <button
                      className="group/btn rounded-lg p-2 text-gray-400 transition-all hover:bg-green-50 hover:text-green-600"
                      title="Vis Detaljer"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="group/btn rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600"
                      title="Flere Alternativer"
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
    </div>
  );
}

export default memo(InventoryTable);

function getDaysUntilExpiration(expirationDate: Date) {
  const today = new Date();
  const diffTime = expirationDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getStatusIcon(quantity: number, expirationDate: Date) {
  const daysUntilExpiry = getDaysUntilExpiration(expirationDate);

  if (quantity === 0) return <XCircle className="h-5 w-5 text-red-500" />;
  if (daysUntilExpiry <= 7 || quantity <= 5)
    return <AlertTriangle className="h-5 w-5 text-amber-500" />;
  return <CheckCircle className="h-5 w-5 text-emerald-500" />;
}

function getStatusBadge(quantity: number, expirationDate: Date) {
  const daysUntilExpiry = getDaysUntilExpiration(expirationDate);

  if (quantity === 0)
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 ring-1 ring-red-600/20">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
        Tomt på Lager
      </div>
    );
  if (daysUntilExpiry <= 7 || quantity <= 5)
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20">
        <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
        {daysUntilExpiry <= 7 ? 'Utløper Snart' : 'Lavt Lager'}
      </div>
    );
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
      På Lager
    </div>
  );
}

function getStockProgressColor(quantity: number, expirationDate: Date) {
  const daysUntilExpiry = getDaysUntilExpiration(expirationDate);

  if (quantity === 0) return 'bg-red-500';
  if (daysUntilExpiry <= 7 || quantity <= 5) return 'bg-amber-500';
  return 'bg-emerald-500';
}

function getStockProgressWidth(quantity: number, expirationDate: Date) {
  const daysUntilExpiry = getDaysUntilExpiration(expirationDate);

  if (quantity === 0) return '0%';

  const quantityPercentage = Math.min((quantity / 20) * 100, 100);
  const expiryPercentage = Math.min((daysUntilExpiry / 30) * 100, 100);

  const finalPercentage = Math.min(quantityPercentage, expiryPercentage);

  return `${Math.max(finalPercentage, 5)}%`;
}

function getCategoryColor(category: string) {
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
}
