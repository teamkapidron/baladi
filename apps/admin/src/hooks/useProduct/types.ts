import { ApiData } from '@/utils/types.util';
import type { Product, Visibility } from '@repo/types/product';

export interface ProductRequestBody {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;

  sku: string;
  barcode: string;

  vat: number;

  costPrice: number;
  salePrice: number;
  unitPrice: number;

  stock: number;

  shelfLife: {
    duration: number;
    unit: 'days' | 'months' | 'years';
  };

  categories: string[];
  images: string[];
  tags: string[];
  isActive: boolean;
  visibility: Visibility;

  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
}

export type GetAllProductsRequest = ApiData<
  {
    search?: string;
    page?: string;
    limit?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    isActive?: 'true' | 'false';
    visibility?: Visibility;
  },
  {
    products: Product[];
    totalProducts: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }
>;

export type CreateProductRequest = ApiData<
  ProductRequestBody,
  {
    product: Product;
  }
>;

export type UpdateProductRequest = ApiData<
  {
    productId: string;
    product: ProductRequestBody;
  },
  {
    product: Product;
  }
>;

export type DeleteProductRequest = ApiData<
  {
    productId: string;
  },
  undefined
>;
