import Link from 'next/link';
import { Users, ArrowRight } from '@repo/ui/lib/icons';
import { Button } from '@repo/ui/components/base/button';

export function TopCustomers() {
  const customers = [
    {
      _id: '1',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      totalSpent: 1000,
      orderCount: 10,
    },
  ];

  return (
    <div className="overflow-hidden bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-slate-900">Top Customers</h2>
          <Link href="/dashboard/customers" className="view-all-link">
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
          {customers.map((customer) => (
            <div
              key={customer._id}
              className="flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center bg-purple-100">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {customer.userName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {customer.userEmail}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">
                  ${customer.totalSpent.toFixed(2)}
                </p>
                <p className="text-xs text-slate-500">
                  {customer.orderCount} orders
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
