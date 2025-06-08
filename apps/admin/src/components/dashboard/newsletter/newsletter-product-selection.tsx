'use client';

import { memo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  category: string;
  featured: boolean;
};

function NewsletterProductSelection() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Coffee Beans (1kg)',
      category: 'Beverages',
      featured: true,
    },
    {
      id: '2',
      name: 'Organic Honey (500g)',
      category: 'Sweeteners',
      featured: true,
    },
    {
      id: '3',
      name: 'Artisan Chocolate Box',
      category: 'Confectionery',
      featured: false,
    },
    {
      id: '4',
      name: 'Italian Olive Oil (750ml)',
      category: 'Oils',
      featured: true,
    },
    {
      id: '5',
      name: 'Gourmet Cheese Selection',
      category: 'Dairy',
      featured: false,
    },
  ];

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <div className="border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-800">
          Select Products for Newsletter
        </h2>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id={`product-${product.id}`}
                  className="mt-1 h-4 w-4 cursor-pointer"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleProductSelection(product.id)}
                />
                <div className="flex-1">
                  <label
                    htmlFor={`product-${product.id}`}
                    className="cursor-pointer font-medium text-gray-800"
                  >
                    {product.name}
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Category: {product.category}
                    </span>
                    {product.featured && (
                      <span className="bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No products available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(NewsletterProductSelection);
