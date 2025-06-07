// Node Modules
import Link from 'next/link';
import { memo } from 'react';
import { ShoppingBag, Users, Package, Mail } from '@repo/ui/lib/icons';

function QuickLinks() {
  return (
    <div className="bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-medium text-slate-900">Quick Access</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Link
          href="/dashboard/products"
          className="flex flex-col items-center justify-center border border-slate-100 bg-slate-50 p-4 text-center transition-colors hover:bg-slate-100"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center bg-blue-100">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-slate-900">Products</span>
          <span className="mt-1 text-xs text-slate-500">Manage inventory</span>
        </Link>

        <Link
          href="/dashboard/customers"
          className="flex flex-col items-center justify-center border border-slate-100 bg-slate-50 p-4 text-center transition-colors hover:bg-slate-100"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center bg-purple-100">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-slate-900">Customers</span>
          <span className="mt-1 text-xs text-slate-500">
            View customer data
          </span>
        </Link>

        <Link
          href="/dashboard/orders"
          className="flex flex-col items-center justify-center border border-slate-100 bg-slate-50 p-4 text-center transition-colors hover:bg-slate-100"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center bg-amber-100">
            <ShoppingBag className="h-5 w-5 text-amber-600" />
          </div>
          <span className="text-sm font-medium text-slate-900">Orders</span>
          <span className="mt-1 text-xs text-slate-500">10 pending orders</span>
        </Link>

        <Link
          href="/dashboard/marketing"
          className="flex flex-col items-center justify-center border border-slate-100 bg-slate-50 p-4 text-center transition-colors hover:bg-slate-100"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center bg-rose-100">
            <Mail className="h-5 w-5 text-rose-600" />
          </div>
          <span className="text-sm font-medium text-slate-900">Marketing</span>
          <span className="mt-1 text-xs text-slate-500">
            Newsletter & campaigns
          </span>
        </Link>
      </div>
    </div>
  );
}

export default memo(QuickLinks);
