'use client';

// Node Modules
import Link from 'next/link';
import React, { memo, useCallback, useMemo } from 'react';
import { Download, Eye, MapPin } from '@repo/ui/lib/icons';

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useOrder } from '@/hooks/useOrder';
import { useOrderPreview } from '@/hooks/useOrder';

// Utils
import { downloadPdfFromHtmlString } from '@/utils/pdf.utils';

function OrderTableContent() {
  const { orders: ordersData } = useOrder();
  const { pickingListMutation, freightLabelMutation } = useOrderPreview();

  const orders = useMemo(() => {
    return ordersData?.orders || [];
  }, [ordersData]);

  const handleDownloadPickingList = useCallback(
    async (orderId: string) => {
      pickingListMutation.mutate(
        { orderId },
        {
          onSuccess: (data) => {
            downloadPdfFromHtmlString(data.html, `${orderId}-picking-list.pdf`);
          },
        },
      );
    },
    [pickingListMutation],
  );

  const handleDownloadFreightLabel = useCallback(
    async (orderId: string) => {
      freightLabelMutation.mutate(
        { orderId },
        {
          onSuccess: (data) => {
            downloadPdfFromHtmlString(
              data.html,
              `${orderId}-freight-label.pdf`,
            );
          },
        },
      );
    },
    [freightLabelMutation],
  );

  return (
    <div className="relative">
      <div className="max-h-[600px] overflow-auto">
        <Table className="w-full border-none">
          <TableHeader className="border-none">
            <TableRow className="border-none">
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                Order ID
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                Customer
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                Total Amount
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                Status
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                Date
              </TableHead>
              <TableHead className="text-muted-foreground bg-background sticky top-0 z-50 border-none p-3 text-left text-sm font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-none">
            {orders.map((order) => {
              return (
                <TableRow key={order._id} className="border-none">
                  <TableCell className="border-none p-3">
                    <div className="text-foreground font-medium">
                      #{order._id.substring(order._id.length - 8)}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      ID: {order._id}
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{order.userId}</span>
                      <div className="text-muted-foreground flex items-center text-xs">
                        <MapPin className="mr-1 h-3 w-3" />
                        {order?.shippingAddress}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3 font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="border-none p-3">
                    {order.status}
                  </TableCell>
                  <TableCell className="text-muted-foreground border-none p-3 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="flex items-center space-x-2">
                      <Link
                        title="View order"
                        href={`/dashboard/orders/${order._id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDownloadPickingList(order._id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDownloadFreightLabel(order._id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground text-sm">
                      No orders found
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default memo(OrderTableContent);
