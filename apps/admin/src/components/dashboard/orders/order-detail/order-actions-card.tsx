import React, { useState } from 'react';
import { Trash, AlertTriangle } from '@repo/ui/lib/icons';
import { OrderStatus } from '@repo/types/order';
import { Card, CardHeader, CardContent } from '@repo/ui/components/base/card';
import { Button } from '@repo/ui/components/base/button';

export default function OrderActionsCard() {
  const order = {
    _id: '123',
    status: OrderStatus.PENDING,
  };

  const onUpdateStatus = (
    orderId: string,
    status: OrderStatus,
    reason?: string,
  ) => {
    console.log(orderId, status, reason);
  };

  const onDeleteOrder = (orderId: string) => {
    console.log(orderId);
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDeleteOrder(order._id);
    } catch {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <Card>
      <CardHeader title="Order Actions" />

      <CardContent className="space-y-4">
        {order.status === OrderStatus.PENDING && (
          <>
            <Button
              variant="success"
              className="w-full justify-center"
              onClick={() => onUpdateStatus(order._id, OrderStatus.CONFIRMED)}
            >
              Confirm Order
            </Button>
            <Button
              variant="outline"
              className="w-full justify-center border-red-200 text-red-600 hover:bg-red-50"
              onClick={() =>
                onUpdateStatus(
                  order._id,
                  OrderStatus.CANCELLED,
                  'Cancelled by admin',
                )
              }
            >
              Cancel Order
            </Button>
          </>
        )}

        {order.status === OrderStatus.CONFIRMED && (
          <Button
            variant="success"
            className="w-full justify-center"
            onClick={() => onUpdateStatus(order._id, OrderStatus.SHIPPED)}
          >
            Mark as Shipped
          </Button>
        )}

        {order.status === OrderStatus.SHIPPED && (
          <Button
            variant="success"
            className="w-full justify-center"
            onClick={() => onUpdateStatus(order._id, OrderStatus.DELIVERED)}
          >
            Mark as Delivered
          </Button>
        )}

        {/* Delete order section */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="mb-3 text-sm font-medium text-gray-900">
            Danger Zone
          </h3>

          {!showDeleteConfirm ? (
            <Button
              variant="outline"
              className="w-full justify-center border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete Order
            </Button>
          ) : (
            <div className="border border-red-200 bg-red-50 p-4">
              <div className="mb-3 flex items-start">
                <AlertTriangle className="mr-2 mt-0.5 h-5 w-5 text-red-500" />
                <p className="text-sm text-red-800">
                  Are you sure you want to delete this order? This action cannot
                  be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="danger"
                  className="flex-1 justify-center"
                  disabled={isDeleting}
                  onClick={handleDelete}
                >
                  {isDeleting ? (
                    <>
                      <svg
                        className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash className="mr-2 h-4 w-4" />
                      Confirm Delete
                    </>
                  )}
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 justify-center"
                  disabled={isDeleting}
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
