import { ProductsHeader } from '@/components/dashboard/products/products-header';
import { MetricCards } from '@/components/dashboard/products/metric-cards';
import ProductTable from '@/components/dashboard/products/product-table';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <ProductsHeader />
      <MetricCards />
      <ProductTable />
    </div>
  );
}
