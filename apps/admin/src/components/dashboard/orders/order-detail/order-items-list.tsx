import React from 'react';
import Image from 'next/image';
import { Badge } from '@repo/ui/components/base/badge';
import { ExternalLink, AlertTriangle, ImageIcon } from '@repo/ui/lib/icons';
import { Card, CardHeader, CardContent } from '@repo/ui/components/base/card';

export default function OrderItemsList() {
  const order = {
    items: [
      {
        productID: {
          name: 'Product 1',
          images: ['https://via.placeholder.com/150'],
          stock: 10,
          price: 100,
          quantity: 1,
          totalPrice: 100,
        },
      },
    ],
    totalAmount: 100,
  };

  return (
    <Card>
      <CardHeader title={`Order Items (${order.items.length})`} />

      <CardContent>
        <div className="space-y-6">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 pl-4 pr-3 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden bg-gray-100">
                          {item.productID.images &&
                          item.productID.images.length > 0 &&
                          item.productID.images[0] &&
                          item.productID.images[0].startsWith('/') ? (
                            <Image
                              src={item.productID.images[0]}
                              alt={item.productID.name}
                              className="h-full w-full object-cover object-center"
                              width={64}
                              height={64}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-400">
                              <ImageIcon className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center font-medium text-gray-900">
                            {item.productID.name}
                            <a
                              href="#"
                              className="text-primary hover:text-primary/80 ml-2"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                          {item.productID.stock < 10 && (
                            <div className="mt-1 flex items-center text-xs">
                              <Badge variant="destructive">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Low stock: {item.productID.stock} left
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      ${item.productID.price.toFixed(2)}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {item.productID.quantity}
                    </td>
                    <td className="px-3 py-4 text-right text-sm font-medium text-gray-900">
                      ${item.productID.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-900">Free</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-gray-200 pt-4 text-base font-medium">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
