import { MetricCards } from '@/components/dashboard/products/metric-cards';
import ProductTable from '@/components/dashboard/products/product-table';
import { ProductsHeader } from '@/components/dashboard/products/products-header';
import { StockAlert } from '@/components/dashboard/products/stock-alert';

export default function ProductsPage() {
  return (
    <div className="space-y-6 p-5">
      <StockAlert />
      <ProductsHeader />
      <MetricCards />
      <ProductTable />
    </div>
  );
}
