import Link from 'next/link';
import { ArrowLeft } from '@repo/ui/lib/icons';
import ProductForm from '@/components/dashboard/products/add-product/product-form/product-form';

export default function NewProductPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/dashboard/products" className="mb-4 rounded-none">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-muted-foreground">
          Create a new product in your inventory
        </p>
      </div>

      <div className="bg-background p-6 shadow-md">
        <ProductForm />
      </div>
    </div>
  );
}
