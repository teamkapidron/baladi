'use client';

// Node Modules
import React, { memo, useState } from 'react';
import { Eye, Trash, MapPin } from '@repo/ui/lib/icons';
import { EditIcon } from '@repo/ui/lib/icons';

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/base/table';

// Types
import { Order, OrderStatus } from '@repo/types/order';

interface Address {
  city?: string;
  state?: string;
  country?: string;
}

function OrderTableContent() {
  const [paginationData, setPaginationData] = useState<{
    startIndex: number;
    endIndex: number;
  }>({ startIndex: 0, endIndex: 0 });
  const [sortedOrders, setSortedOrders] = useState<Order[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const toggleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === sortedOrders.length
        ? []
        : sortedOrders.map((order) => order._id),
    );
  };

  const toggleOrderSelection = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleViewOrder = (id: string) => {
    console.log('View order:', id);
  };

  const handleEditOrder = (id: string) => {
    console.log('Edit order:', id);
  };

  const handleDeleteOrder = (id: string) => {
    console.log('Delete order:', id);
  };

  // Format address for display
  const formatAddress = (address: Address | undefined) => {
    if (!address) return 'N/A';

    // Create a shorter address display for the table
    const city = address.city || '';
    const state = address.state || '';
    const country = address.country || '';

    // Return a simplified address for the table
    return [city, state, country].filter(Boolean).join(', ');
  };

  // Get status badge
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return (
          <div className="inline-flex items-center bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
            Pending
          </div>
        );
      case OrderStatus.CONFIRMED:
        return (
          <div className="inline-flex items-center bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            Confirmed
          </div>
        );
      case OrderStatus.SHIPPED:
        return (
          <div className="inline-flex items-center bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
            Shipped
          </div>
        );
      case OrderStatus.DELIVERED:
        return (
          <div className="inline-flex items-center bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Delivered
          </div>
        );
      case OrderStatus.CANCELLED:
        return (
          <div className="inline-flex items-center bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            Cancelled
          </div>
        );
      default:
        return null;
    }
  };

  // Format date function
  const formatDate = (date: Date) => {
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const currentPageData = sortedOrders.slice(
    paginationData.startIndex,
    paginationData.endIndex,
  );

  return (
    <div className="relative">
      <div className="max-h-[600px] overflow-auto">
        <Table className="w-full border-none">
          <TableHeader className="border-none">
            <TableRow className="border-none">
              <TableHead className="bg-background sticky top-0 z-50 w-10 border-none p-3 text-left">
                <input
                  type="checkbox"
                  className="border-input bg-background h-4 w-4 cursor-pointer"
                  checked={
                    selectedOrders.length === currentPageData.length &&
                    currentPageData.length > 0
                  }
                  onChange={toggleSelectAll}
                  title="Select all orders"
                  aria-label="Select all orders"
                />
              </TableHead>
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
            {currentPageData.map((order) => {
              const isSelected = selectedOrders.includes(order._id);
              return (
                <TableRow
                  key={order._id}
                  className={`${isSelected ? 'selected' : ''} border-none`}
                >
                  <TableCell className="border-none p-3">
                    <input
                      type="checkbox"
                      className="border-input bg-background h-4 w-4 cursor-pointer"
                      checked={isSelected}
                      onChange={() => toggleOrderSelection(order._id)}
                      title={`Select order ${order._id}`}
                      aria-label={`Select order ${order._id}`}
                    />
                  </TableCell>
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
                        {formatAddress(order?.shippingAddress as Address)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border-none p-3 font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="border-none p-3">
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell className="text-muted-foreground border-none p-3 text-sm">
                    {formatDate(new Date(order.createdAt))}
                  </TableCell>
                  <TableCell className="border-none p-3">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-muted-foreground hover:text-foreground p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewOrder(order._id);
                        }}
                        title="View order"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 text-blue-500 hover:text-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditOrder(order._id);
                        }}
                        title="Edit order"
                      >
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="text-destructive hover:text-destructive/80 p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteOrder(order._id);
                        }}
                        title="Delete order"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            {currentPageData.length === 0 && (
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
