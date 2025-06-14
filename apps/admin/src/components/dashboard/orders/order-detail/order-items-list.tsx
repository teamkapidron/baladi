'use client';

// Node Modules
import React, { memo } from 'react';
import { ExternalLink, ImageIcon, Package } from '@repo/ui/lib/icons';

// Components
import { Card, CardHeader, CardContent } from '@repo/ui/components/base/card';

// Hooks
import { useOrderDetails } from '@/hooks/useOrder';

interface OrderItemsListProps {
  orderId: string;
}

function OrderItemsList({ orderId }: OrderItemsListProps) {
  const { data: orderData } = useOrderDetails(orderId);
  const order = orderData?.order;

  if (!order) {
    return (
      <Card className="border-[var(--baladi-border)] shadow-lg">
        <CardHeader className="border-b border-[var(--baladi-border)]">
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
            Ordre Varer
          </h2>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-[var(--baladi-muted)]"></div>
              <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                Laster ordre varer...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[var(--baladi-border)] shadow-lg">
      <CardHeader className="border-b border-[var(--baladi-border)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
              Ordre Varer ({order.items?.length || 0})
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Detaljerte oversikt over bestilte produkter
            </p>
          </div>
          <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-secondary)]/10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br">
            <Package className="h-6 w-6 text-[var(--baladi-primary)]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="hidden overflow-hidden rounded-lg border border-[var(--baladi-border)] md:block">
            <table className="min-w-full divide-y divide-[var(--baladi-border)]">
              <thead className="to-[var(--baladi-muted)]/70 bg-gradient-to-r from-[var(--baladi-muted)]">
                <tr>
                  <th
                    scope="col"
                    className="py-4 pl-6 pr-3 text-left font-[family-name:var(--font-sora)] text-sm font-bold text-[var(--baladi-dark)]"
                  >
                    Produkt
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-bold text-[var(--baladi-dark)]"
                  >
                    Pris
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4 text-left font-[family-name:var(--font-sora)] text-sm font-bold text-[var(--baladi-dark)]"
                  >
                    Antall
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4 text-right font-[family-name:var(--font-sora)] text-sm font-bold text-[var(--baladi-dark)]"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--baladi-border)] bg-white">
                {order.items?.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:from-[var(--baladi-primary)]/5 hover:to-[var(--baladi-secondary)]/5 group transition-all duration-200 hover:bg-gradient-to-r"
                  >
                    <td className="py-6 pl-6 pr-3">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)]">
                          <div className="flex h-full w-full items-center justify-center text-[var(--baladi-gray)]">
                            <ImageIcon className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-[family-name:var(--font-sora)] text-base font-semibold text-[var(--baladi-dark)]">
                              Produkt ID: {item.productId._id}
                            </span>
                            <button className="text-[var(--baladi-primary)] transition-colors hover:text-[var(--baladi-secondary)]">
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                            Detaljer ikke tilgjengelig
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-6">
                      <span className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-[var(--baladi-dark)]">
                        {item.price?.toLocaleString('no-NO') || '0'} kr
                      </span>
                    </td>
                    <td className="px-3 py-6">
                      <div className="flex items-center gap-2">
                        <span className="bg-[var(--baladi-primary)]/10 rounded-full px-3 py-1 font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-primary)]">
                          {item.quantity}
                        </span>
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                          stk
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-6 text-right">
                      <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
                        {item.price?.toLocaleString('no-NO') || '0'} kr
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 md:hidden">
            {order.items?.map((item, index) => (
              <div
                key={index}
                className="to-[var(--baladi-muted)]/30 rounded-lg border border-[var(--baladi-border)] bg-gradient-to-r from-white p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)]">
                    <div className="flex h-full w-full items-center justify-center text-[var(--baladi-gray)]">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-[family-name:var(--font-sora)] text-base font-semibold text-[var(--baladi-dark)]">
                      Produkt ID: {item.productId._id}
                    </h3>
                    <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                          Pris
                        </p>
                        <p className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
                          {item.price?.toLocaleString('no-NO') || '0'} kr
                        </p>
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                          Antall
                        </p>
                        <p className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
                          {item.quantity}
                        </p>
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                          Total
                        </p>
                        <p className="font-[family-name:var(--font-sora)] font-bold text-[var(--baladi-primary)]">
                          {item.price?.toLocaleString('no-NO') || '0'} kr
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="to-[var(--baladi-muted)]/70 rounded-lg border border-[var(--baladi-border)] bg-gradient-to-r from-[var(--baladi-muted)] p-6">
            <h3 className="mb-4 font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
              Ordre Sammendrag
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Delsum
                </span>
                <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
                  {order.totalAmount?.toLocaleString('no-NO') || '0'} kr
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  MVA (25%)
                </span>
                <span className="font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
                  {((order.totalAmount || 0) * 0.25).toLocaleString('no-NO')} kr
                </span>
              </div>
              <div className="border-t border-[var(--baladi-border)] pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                    Total
                  </span>
                  <span className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-primary)]">
                    {order.totalAmount?.toLocaleString('no-NO') || '0'} kr
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(OrderItemsList);
