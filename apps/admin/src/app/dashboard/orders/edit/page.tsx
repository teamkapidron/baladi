import Link from 'next/link';
import { ArrowLeft } from '@repo/ui/lib/icons';
import EditOrderForm from '@/components/dashboard/orders/edit-order/edit-order-form';

export default function EditOrderPage() {
  const orderId = '1234567890';

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/orders">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">
              Edit Order #{orderId?.substring(orderId.length - 8)}
            </h1>
            <p className="text-muted-foreground text-sm">
              Update order details and shipping information
            </p>
          </div>
        </div>
      </div>

      <EditOrderForm />
    </div>
  );
}
