import { ApiData } from '@/utils/types.util';
import type { Product, Visibility } from '@repo/types/product';

export type ProductRequestBody = Omit<
  Product,
  '_id' | 'createdAt' | 'updatedAt'
>;

export type ProductResponse = Omit<Product, 'categories'> & {
  categories?: {
    _id: string;
    name: string;
    slug: string;
  }[];
  stock: number;
};

export type GetAllProductsRequest = ApiData<
  {
    search?: string;
    page?: string;
    limit?: string;
    category?: string;
    isActive?: 'true' | 'false';
    visibility?: Visibility;
  },
  {
    products: ProductResponse[];
    totalProducts: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetProductByIdRequest = ApiData<
  {
    productId: string;
  },
  {
    product: ProductResponse;
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

export type LowStockProductsRequest = ApiData<
  {
    lowStockThreshold?: string;
  },
  {
    outOfStockProducts: {
      _id: string;
      name: string;
      categories: {
        _id: string;
        name: string;
      }[];
    }[];
    lowStockProducts: {
      _id: string;
      name: string;
      categories: {
        _id: string;
        name: string;
      }[];
    }[];
    outOfStockCount: number;
    lowStockCount: number;
  }
>;

export type TopProductsRequest = ApiData<
  {
    limit?: string;
    from?: string;
    to?: string;
  },
  {
    products: {
      product: {
        _id: string;
        name: string;
        image: string;
        slug: string;
        unitPrice: number;
      };
      totalQuantity: number;
      totalOrders: number;
    }[];
  }
>;

export type ProductStatsRequest = ApiData<
  undefined,
  {
    totalProducts: number;
    totalCategories: number;
    activeProducts: number;
    activeCategories: number;
  }
>;
