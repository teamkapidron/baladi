'use client';

// Node Modules
import React, { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle,
  TruckIcon,
  PackageIcon,
  XCircle,
  Clock,
  ChevronRight,
  Edit3,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useOrderDetails } from '@/hooks/useOrder';

// Types/Utils
import { formatDate } from '@repo/ui/lib/date';
import { OrderStatus } from '@repo/types/order';

interface UpdateOrderHeaderProps {
  orderId: string;
}

function UpdateOrderHeader(props: UpdateOrderHeaderProps) {
  const { orderId } = props;
  const router = useRouter();

  const { data: orderData } = useOrderDetails(orderId);
  const order = orderData?.order;

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-[var(--baladi-primary)] via-[var(--baladi-primary)] to-[var(--baladi-secondary)] shadow-lg">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
        <div className="absolute right-1/4 top-1/2 h-24 w-24 rounded-full bg-white/5"></div>
      </div>

      <div className="relative border-b border-white/20 px-6 py-4">
        <div className="flex items-center font-[family-name:var(--font-dm-sans)] text-sm">
          <Button
            variant="link"
            onClick={() => router.push('/dashboard/orders')}
            className="flex items-center text-white/80 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ordrer
          </Button>
          <ChevronRight className="mx-3 h-4 w-4 text-white/60" />
          <Button
            variant="link"
            onClick={() => router.push(`/dashboard/orders/${orderId}`)}
            className="text-white/80 transition-colors duration-200 hover:text-white"
          >
            #{orderId.toUpperCase()}
          </Button>
          <ChevronRight className="mx-3 h-4 w-4 text-white/60" />
          <span className="font-medium text-white">Oppdater</span>
        </div>
      </div>

      <div className="relative flex flex-col items-start justify-between gap-6 p-6 lg:flex-row lg:items-center">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/10">
                <Edit3 className="h-5 w-5 text-white" />
              </div>
              <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold tracking-tight text-white lg:text-3xl">
                Oppdater Ordre #{orderId.slice(-8).toUpperCase()}
              </h1>
            </div>
            {order?.status && getStatusBadge(order.status)}
          </div>

          <div className="space-y-2">
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
              Opprettet:{' '}
              {order?.createdAt
                ? formatDate(
                    new Date(order.createdAt),
                    "MMM d, yyyy 'kl.' HH:mm",
                  )
                : 'Loading...'}
            </p>
            {order?.totalAmount && (
              <p className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-white">
                Total: {order.totalAmount.toLocaleString('no-NO')} kr
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            size="sm"
            className="group border-white/20 bg-white/10 font-[family-name:var(--font-dm-sans)] text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/20"
            onClick={handleCancel}
          >
            Avbryt
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[var(--baladi-accent)] via-white/50 to-[var(--baladi-accent)]"></div>
    </div>
  );
}

export default memo(UpdateOrderHeader);

function getStatusBadge(status: OrderStatus) {
  const badgeClasses =
    'flex items-center gap-1.5 rounded-full px-3 py-1.5 font-[family-name:var(--font-dm-sans)] text-xs font-semibold';

  switch (status) {
    case OrderStatus.PENDING:
      return (
        <div
          className={`${badgeClasses} bg-amber-100/90 text-amber-800 backdrop-blur-sm`}
        >
          <Clock className="h-3 w-3" />
          Venter
        </div>
      );
    case OrderStatus.CONFIRMED:
      return (
        <div
          className={`${badgeClasses} bg-blue-100/90 text-blue-800 backdrop-blur-sm`}
        >
          <CheckCircle className="h-3 w-3" />
          Bekreftet
        </div>
      );
    case OrderStatus.SHIPPED:
      return (
        <div
          className={`${badgeClasses} bg-purple-100/90 text-purple-800 backdrop-blur-sm`}
        >
          <TruckIcon className="h-3 w-3" />
          Sendt
        </div>
      );
    case OrderStatus.DELIVERED:
      return (
        <div
          className={`${badgeClasses} bg-green-100/90 text-green-800 backdrop-blur-sm`}
        >
          <PackageIcon className="h-3 w-3" />
          Levert
        </div>
      );
    case OrderStatus.CANCELLED:
      return (
        <div
          className={`${badgeClasses} bg-red-100/90 text-red-800 backdrop-blur-sm`}
        >
          <XCircle className="h-3 w-3" />
          Kansellert
        </div>
      );
    default:
      return null;
  }
}
