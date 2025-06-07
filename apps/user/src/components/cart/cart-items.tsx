'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2, X } from '@repo/ui/lib/icons';

import { Button } from '@repo/ui/components/base/button';
import { QuantityInput } from '@repo/ui/components/base/quantity-input';

function CartItems() {
  const cart = [
    {
      _id: '1',
      product: {
        name: 'Product 1',
        slug: 'product-1',
        images: ['https://placehold.co/150x150?text=Ingen+Bilde'],
        shortDescription: 'Short Description',
        salePrice: 100,
        price: 100,
      },
      quantity: 1,
      productID: '1',
      totalPrice: 100,
    },
  ];
  const isLoading = false;
  const clearCart = () => {};
  const navigateToProduct = (slug: string) => {
    console.log(slug);
  };
  const updateQuantity = () => {};
  const removeItem = () => {};

  return (
    <div className="h-full overflow-hidden rounded-md bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          Handlekurv ({cart.length})
        </h2>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => clearCart()}
          disabled={isLoading}
          iconLeft={<X size={14} />}
          className="hover:bg-red-600"
        >
          Tøm Kurv
        </Button>
      </div>

      <div
        className={`divide-y divide-gray-100 ${cart.length > 5 ? 'cart-items-container' : ''}`}
      >
        {cart.map((item) => (
          <div key={item._id} className="flex flex-col gap-4 p-6 sm:flex-row">
            <div
              className="h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md bg-gray-50"
              onClick={() => navigateToProduct(item.product.slug)}
            >
              <Image
                width={80}
                height={80}
                src={(() => {
                  try {
                    // Check if URL is valid
                    const url = item.product.images?.[0];
                    if (url) new URL(url);
                    return (
                      url || 'https://placehold.co/150x150?text=Ingen+Bilde'
                    );
                  } catch {
                    // If URL is invalid, use placeholder
                    return 'https://placehold.co/150x150?text=Ingen+Bilde';
                  }
                })()}
                alt={item.product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-grow">
              <h3
                className="cursor-pointer font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]"
                onClick={() => navigateToProduct(item.product.slug)}
              >
                {item.product.name}
              </h3>
              <p className="mb-2 text-sm text-[var(--color-muted-foreground)]">
                {item.product.shortDescription || ''}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <QuantityInput
                  value={item.quantity}
                  onChange={(value) => {}}
                  disabled={isLoading}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {}}
                  disabled={isLoading}
                  iconLeft={<Trash2 size={14} />}
                  className="hover:bg-red-600"
                >
                  Fjern
                </Button>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-semibold text-[var(--color-primary)]">
                {item.totalPrice}
              </div>
              <div className="text-sm text-[var(--color-muted-foreground)]">
                {item.product.salePrice} per stk
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItems;
