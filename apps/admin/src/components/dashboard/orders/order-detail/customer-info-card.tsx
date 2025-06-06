import React from 'react';
import { Mail, Hash } from '@repo/ui/lib/icons';
import { Button } from '@repo/ui/components/base/button';
import { Card, CardHeader, CardContent } from '@repo/ui/components/base/card';

export default function CustomerInfoCard() {
  const order = {
    userID: {
      _id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  };

  const onViewCustomerProfile = () => {
    console.log('View customer profile');
  };

  return (
    <Card>
      <CardHeader title="Customer Information" />

      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center">
            {order.userID.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{order.userID.name}</h3>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Mail className="mr-1.5 h-3.5 w-3.5" />
              {order.userID.email}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <div className="flex items-center gap-2 text-sm">
            <Hash className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500">Customer ID:</span>
            <span className="bg-gray-100 px-2 py-1 font-mono text-xs">
              {order.userID._id}
            </span>
          </div>

          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={onViewCustomerProfile}
            >
              View Customer Profile
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <h4 className="mb-2 text-sm font-medium text-gray-900">
            Customer Stats
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3">
              <p className="mb-1 text-xs text-gray-500">Total Orders</p>
              <p className="text-lg font-semibold text-gray-900">5</p>
            </div>
            <div className="bg-gray-50 p-3">
              <p className="mb-1 text-xs text-gray-500">Lifetime Value</p>
              <p className="text-lg font-semibold text-gray-900">$1,245.80</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
