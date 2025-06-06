import { Visibility } from '@repo/types/product';

export interface ProductFilter {
  $or?: { [key: string]: RegExp }[];
  salePrice?: { $gte?: number; $lte?: number };
  isActive?: boolean;
  visibility?: Visibility;
  category?: string;
}

export interface QuickSearchProductAggregateType {
  name: string;
  images: string[];
  slug: string;
  unitPrice: number;
  salePrice: number;
  shortDescription: string;
  categories: {
    name: string;
    slug: string;
  }[];
}

export interface QuickSearchProduct {
  name: string;
  image: string | undefined;
  slug: string;
  unitPrice: number;
  salePrice: number;
  shortDescription: string;
  categories: {
    name: string;
    slug: string;
  };
}
