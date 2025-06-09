import React from 'react';
import {
  Calendar,
  Clock,
  User,
  CreditCard,
  MapPin,
  Phone,
  AlertCircle,
} from '@repo/ui/lib/icons';
import { Card, CardHeader, CardContent } from '@repo/ui/components/base/card';
import DataItem from './atoms/data-item';

const formatDate = (date: Date) => {
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

interface Address {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
}

const formatAddress = (address: Address) => {
  if (!address) return 'N/A';
  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter(Boolean);
  return parts.join(', ');
};

export default function OrderSummaryCard() {
  const order = {
    createdAt: new Date(),
    updatedAt: new Date(),
    userID: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    shippingAddress: {
      addressLine1: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345',
      country: 'USA',
      phoneNumber: '123-456-7890',
    },
    cancellationReason: 'Customer requested cancellation',
    cancelledBy: 'Customer',
  };

  return (
    <Card>
      <CardHeader title="Order Summary" />

      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <DataItem
                icon={<Calendar className="h-4 w-4" />}
                label="Date Placed"
                value={formatDate(new Date(order.createdAt))}
              />

              <DataItem
                icon={<Clock className="h-4 w-4" />}
                label="Last Updated"
                value={formatDate(new Date(order.updatedAt))}
              />
            </div>

            <div className="border-t border-gray-100 pt-6">
              <DataItem
                icon={<User className="h-4 w-4" />}
                label="Customer"
                value={
                  <div>
                    <div>{order.userID.name}</div>
                    <div className="mt-1 text-sm text-gray-500">
                      {order.userID.email}
                    </div>
                  </div>
                }
              />
            </div>

            <div className="border-t border-gray-100 pt-6">
              <DataItem
                icon={<CreditCard className="h-4 w-4" />}
                label="Payment"
                value={
                  <div className="flex items-center">
                    <span className="mr-2 inline-block h-2 w-2 bg-green-500"></span>
                    <span>Completed</span>
                  </div>
                }
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <DataItem
                icon={<MapPin className="h-4 w-4" />}
                label="Shipping Address"
                value={
                  <div>
                    <div className="text-gray-900">
                      {formatAddress(order.shippingAddress)}
                    </div>
                    {order.shippingAddress.phoneNumber && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Phone className="mr-1 h-3 w-3" />
                        {order.shippingAddress.phoneNumber}
                      </div>
                    )}
                  </div>
                }
              />
            </div>

            {order.cancellationReason && (
              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="flex items-start gap-3 bg-red-50 p-4 text-red-800">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-red-800">
                      Cancellation Reason
                    </p>
                    <p className="mt-1 text-sm">{order.cancellationReason}</p>
                    {order.cancelledBy && (
                      <p className="mt-2 text-xs text-red-700">
                        Cancelled by: {order.cancelledBy}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
