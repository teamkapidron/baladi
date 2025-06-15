'use client';

// Node Modules
import { memo, useMemo } from 'react';

// Components
import ProductForm from '@/components/dashboard/products/product-form/product-form';
import { ProductFormValues } from '@/components/dashboard/products/product-form/product-schema';

// Hooks
import { useProductBySlug, useProduct } from '@/hooks/useProduct';

interface EditProductProps {
  slug: string;
}

function EditProduct(props: EditProductProps) {
  const { slug } = props;

  const { updateProductMutation } = useProduct();
  const { data: productData } = useProductBySlug(slug);

  const product = productData?.product;

  const defaultValues = useMemo(() => {
    if (!product) return undefined;

    return {
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,

      sku: product.sku,
      barcode: product.barcode,

      vat: product.vat,

      costPrice: product.costPrice,
      salePrice: product.salePrice,
      noOfUnits: product.noOfUnits,

      categories: product.categories?.map((category) => category.name) || [],

      images: product.images?.map((image) => new File([], image)) || [],
      isActive: product.isActive,
      visibility: product.visibility,

      hasVolumeDiscount: product.hasVolumeDiscount,

      dimensions: product.dimensions,
      weight: product.weight,

      supplier: product.supplier,
    };
  }, [product]);

  function onSubmit(data: ProductFormValues) {
    if (!product) return;

    updateProductMutation.mutate({
      productId: product._id,
      product: data,
    });
  }

  return (
    <div className="bg-background rounded-xl p-5 shadow-md">
      <ProductForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isPending={updateProductMutation.isPending}
      />
    </div>
  );
}

export default memo(EditProduct);
