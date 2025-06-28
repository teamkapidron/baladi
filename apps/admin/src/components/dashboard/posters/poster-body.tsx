'use client';

// Node Modules
import { memo, useState } from 'react';

// Components
import PosterProductSelection from './poster-product-selection';
import PosterCreator from './poster-creator';

function PosterBody() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <PosterProductSelection
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <PosterCreator selectedProducts={selectedProducts} />
    </div>
  );
}

export default memo(PosterBody);
