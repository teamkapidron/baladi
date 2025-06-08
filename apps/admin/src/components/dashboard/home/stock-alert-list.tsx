'use client';

// Node Modules
import { memo, useMemo } from 'react';
import { AlertTriangle, Package, ArrowRight } from '@repo/ui/lib/icons';

// Hooks
import { useProduct } from '@/hooks/useProduct';

type StockAlert = {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  status: 'low' | 'out';
  category: string;
  price: number;
};

function StockAlertsList() {
  const { products, lowStockProductsQuery } = useProduct();

  const stockAlerts = useMemo(() => {
    // Use lowStockProductsQuery data if available, otherwise filter products
    const lowStockData = lowStockProductsQuery.data;
    if (lowStockData) {
      const alerts: StockAlert[] = [];

      // Add out of stock products
      if (lowStockData.outOfStock?.outOfStockProducts) {
        lowStockData.outOfStock.outOfStockProducts.forEach((product: any) => {
          alerts.push({
            id: product._id,
            name: product.name,
            currentStock: product.stock || 0,
            minStock: product.minStock || 5,
            status: 'out' as const,
            category: product.category?.name || 'Uncategorized',
            price: product.price || 0,
          });
        });
      }

      // Add low stock products
      if (lowStockData.lowStock?.lowStockProducts) {
        lowStockData.lowStock.lowStockProducts.forEach((product: any) => {
          alerts.push({
            id: product._id,
            name: product.name,
            currentStock: product.stock || 0,
            minStock: product.minStock || 5,
            status: 'low' as const,
            category: product.category?.name || 'Uncategorized',
            price: product.price || 0,
          });
        });
      }

      return alerts.sort((a: StockAlert, b: StockAlert) => {
        if (a.status === 'out' && b.status === 'low') return -1;
        if (a.status === 'low' && b.status === 'out') return 1;
        return a.currentStock - b.currentStock;
      });
    }

    // Fallback to products data
    const productsData = products?.products ?? [];
    return productsData
      .filter((product: any) => {
        const currentStock = product.stock || 0;
        const minStock = product.minStock || 5;
        return currentStock <= minStock;
      })
      .map(
        (product: any): StockAlert => ({
          id: product._id,
          name: product.name,
          currentStock: product.stock || 0,
          minStock: product.minStock || 5,
          status: (product.stock || 0) === 0 ? 'out' : 'low',
          category: product.category?.name || 'Uncategorized',
          price: product.price || 0,
        }),
      )
      .sort((a: StockAlert, b: StockAlert) => {
        if (a.status === 'out' && b.status === 'low') return -1;
        if (a.status === 'low' && b.status === 'out') return 1;
        return a.currentStock - b.currentStock;
      });
  }, [products, lowStockProductsQuery.data]);

  const { outOfStock, lowStock } = useMemo(() => {
    return stockAlerts.reduce(
      (acc, alert) => {
        if (alert.status === 'out') acc.outOfStock++;
        else acc.lowStock++;
        return acc;
      },
      { outOfStock: 0, lowStock: 0 },
    );
  }, [stockAlerts]);

  const getStatusColor = (status: 'low' | 'out') => {
    return status === 'out' ? 'var(--baladi-error)' : 'var(--baladi-warning)';
  };

  const getStatusBgColor = (status: 'low' | 'out') => {
    return status === 'out'
      ? 'bg-[var(--baladi-error)]/10'
      : 'bg-[var(--baladi-warning)]/10';
  };

  const getStatusText = (status: 'low' | 'out') => {
    return status === 'out' ? 'Out of Stock' : 'Low Stock';
  };

  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-[var(--baladi-border)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
            Stock Alerts
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Products requiring immediate attention
          </p>
        </div>
        <a
          href="/dashboard/inventory"
          className="bg-[var(--baladi-primary)]/10 hover:bg-[var(--baladi-primary)]/20 group flex items-center gap-1 rounded-lg px-3 py-1.5 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)] transition-colors"
        >
          Manage
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Summary Cards */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="bg-[var(--baladi-error)]/5 rounded-lg p-3">
          <div className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-error)]">
            Out of Stock
          </div>
          <div className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
            {outOfStock}
          </div>
        </div>
        <div className="bg-[var(--baladi-warning)]/5 rounded-lg p-3">
          <div className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-warning)]">
            Low Stock
          </div>
          <div className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
            {lowStock}
          </div>
        </div>
      </div>

      {stockAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-[var(--baladi-success)]/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Package className="h-8 w-8 text-[var(--baladi-success)]" />
          </div>
          <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
            All products in stock
          </h4>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            All your products have sufficient stock levels. Great job!
          </p>
        </div>
      ) : (
        <div className="max-h-64 space-y-2 overflow-y-auto">
          {stockAlerts.slice(0, 8).map((alert) => (
            <div
              key={alert.id}
              className="hover:border-[var(--baladi-primary)]/20 group rounded-lg border border-[var(--baladi-border)] p-3 transition-all duration-200 hover:bg-[var(--baladi-light)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-secondary)]/10 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br">
                    <AlertTriangle
                      className="h-5 w-5"
                      style={{ color: getStatusColor(alert.status) }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      {alert.name}
                    </div>
                    <div className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      <span>{alert.category}</span>
                      <span>•</span>
                      <span>${alert.price}</span>
                      <span>•</span>
                      <span>Min: {alert.minStock}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="font-[family-name:var(--font-sora)] text-sm font-bold text-[var(--baladi-dark)]">
                      {alert.currentStock}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 font-[family-name:var(--font-dm-sans)] text-xs font-medium ${getStatusBgColor(alert.status)}`}
                      style={{ color: getStatusColor(alert.status) }}
                    >
                      {getStatusText(alert.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {stockAlerts.length > 8 && (
            <div className="mt-3 text-center">
              <a
                href="/dashboard/inventory"
                className="hover:text-[var(--baladi-primary)]/80 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-primary)]"
              >
                View {stockAlerts.length - 8} more alerts
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(StockAlertsList);
