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
  cartonPrice?: number;
  unitPrice?: number;
  salePrice: number;

  stock: number;

  shelfLife?: {
    duration: number;
    unit: 'days' | 'months' | 'years';
  };
  unitsPerCarton?: number;

  categories?: string[];

  images?: string[];
  isActive?: boolean;
  visibility: Visibility;

  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  weight?: string | number;

  createdAt: Date;
  updatedAt: Date;
}
