export enum Visibility {
  BOTH = 'both',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;

  sku?: string;
  barcode?: string;

  vat: number;

  costPrice: number;
  salePrice: number;
  unitPrice: number;

  stock: number;

  shelfLife?: {
    duration: number;
    unit: 'days' | 'months' | 'years';
  };

  categories?: string[];

  images?: string[];
  isActive: boolean;
  visibility: Visibility;

  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  weight?: number;

  createdAt: Date;
  updatedAt: Date;
}
