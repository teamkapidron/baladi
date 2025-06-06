import { ApiData } from '@/utils/types.util';
import { Product } from '@repo/types/product';

export interface ProductResponse extends Product {
  isFavorite?: boolean;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
}

export type GetProductsRequest = ApiData<
  {
    page: number;
    limit: number;
    search: string;
    category: string;
    minPrice: number;
    maxPrice: number;
  },
  {
    products: ProductResponse[];
    totalProducts: number;
    page: number;
    perPage: number;
    totalPages: number;
  }
>;

export type GetProductByIdRequest = ApiData<
  {
    productId: string;
  },
  {
    product: Product;
  }
>;

export type GetProductBySlugRequest = ApiData<
  {
    slug: string;
  },
  {
    product: Product;
  }
>;
