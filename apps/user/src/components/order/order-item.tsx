'use client';

import React from 'react';
import Image from 'next/image';

const PLACEHOLDER_IMAGE = 'https://placehold.co/150x150?text=No+Image';

function OrderItems() {
  const product = {
    name: 'Product',
    shortDescription: 'Product description',
    salePrice: 100,
    images: ['https://placehold.co/150x150?text=No+Image'],
  };
  const productName = product.name;
  const productDescription = product.shortDescription || '';
  const productPrice = product.salePrice;

  let imageUrl = PLACEHOLDER_IMAGE;
  if (product.images && product.images.length > 0) {
    const productImage = product.images[0];
    imageUrl = productImage || PLACEHOLDER_IMAGE;
  }

  return (
    <div className="mb-4 border border-gray-100 bg-white p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-gray-50">
          <Image
            width={100}
            height={100}
            src={imageUrl}
            alt={productName}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            onError={() => {
              // This is a backup error handler
              const imgElement = document.querySelector(
                `[alt="${productName}"]`,
              ) as HTMLImageElement;
              if (imgElement) {
                imgElement.src = PLACEHOLDER_IMAGE;
              }
            }}
          />
        </div>

        <div className="flex-grow">
          <h3 className="font-medium text-[var(--color-text)]">
            {productName}
          </h3>
          <p className="mb-3 text-sm text-[var(--color-muted-foreground)]">
            {productDescription}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Quantity:</span>
              <span className="bg-gray-100 px-2 py-0.5 text-sm">1</span>
            </div>
            <span className="font-medium text-[var(--color-primary)]">
              ${productPrice.toFixed(2)} each
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItems;
