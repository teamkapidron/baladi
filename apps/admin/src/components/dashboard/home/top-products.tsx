import Link from 'next/link';
import { Package, ArrowRight } from '@repo/ui/lib/icons';
import { Button } from '@repo/ui/components/base/button';

export function TopProducts() {
  const products = [
    {
      _id: '1',
      totalQuantity: 100,
      totalRevenue: 1000,
      orderCount: 10,
      productName: 'Product 1',
    },
  ];

  return (
    <div className="overflow-hidden bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-slate-900">Top Products</h2>
          <Link href="/dashboard/products" className="view-all-link">
            <Button
              variant="outline"
              className="group gap-1.5 border-[--color-primary] text-[--color-primary] transition-colors hover:bg-[--color-background-light] hover:text-[--color-primary]"
            >
              View All
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center bg-blue-100">
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="max-w-[250px] truncate text-sm font-medium text-slate-900">
                      {product.productName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {product.orderCount} orders • {product.totalQuantity}{' '}
                      units
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">
                  ${product.totalRevenue.toFixed(2)}
                </p>
                <p className="text-xs text-slate-500">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
