import { PipelineStage, Types } from 'mongoose';
import { Product, Visibility } from '@repo/types/product';

import { ProductFilter, UserProductFilter } from '@/types/product.types';
import type {
  GetAllProductsSchema,
  GetProductsSchema,
  BulkAddProductsSchema,
} from '@/validators/product.validator';
import { generateSlug } from './common/string.util';

export function getUserProductFilterFromQuery(
  query: GetProductsSchema['query'],
) {
  const { search, page, limit, category, minPrice, maxPrice } = query;

  const perPage = parseInt(limit ?? '10', 10);
  const currentPage = parseInt(page ?? '1', 10);

  const queryObject: UserProductFilter = {};

  if (search) {
    queryObject.$or = [
      { name: new RegExp(search, 'i') },
      { slug: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
    ];
  }

  if (category) {
    queryObject.categories = { $in: [new Types.ObjectId(category)] };
  }

  if (minPrice || maxPrice) {
    queryObject.salePrice = {};

    if (minPrice) {
      queryObject.salePrice.$gte = parseInt(minPrice, 10);
    }

    if (maxPrice && parseInt(maxPrice, 10) !== 0) {
      queryObject.salePrice.$lte = parseInt(maxPrice, 10);
    }
  }

  return {
    queryObject,
    perPage,
    currentPage,
  };
}

export function getProductFilterFromQuery(
  query: GetAllProductsSchema['query'],
) {
  const { search, page, limit, category, isActive, visibility } = query;

  const perPage = parseInt(limit ?? '10', 10);
  const currentPage = parseInt(page ?? '1', 10);

  const queryObject: ProductFilter = {};

  if (search) {
    queryObject.$or = [
      { name: new RegExp(search, 'i') },
      { slug: new RegExp(search, 'i') },
    ];
  }

  if (category) {
    queryObject.categories = { $in: [new Types.ObjectId(category)] };
  }

  if (isActive) {
    queryObject.isActive = isActive === 'true';
  }

  if (visibility) {
    queryObject.visibility = visibility as Visibility;
  }

  return {
    queryObject,
    perPage,
    currentPage,
  };
}

export function buildStockPipeline(stockThreshold: number, limit: number = 5) {
  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: 'inventories',
        localField: '_id',
        foreignField: 'productId',
        as: 'inventory',
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
    {
      $addFields: {
        totalStock: { $sum: '$inventory.quantity' },
      },
    },
    {
      $match: {
        totalStock: stockThreshold === 0 ? 0 : { $gt: 0, $lte: stockThreshold },
      },
    },
    {
      $project: {
        name: 1,
        categories: {
          _id: 1,
          name: 1,
        },
        totalStock: 1,
      },
    },
    {
      $limit: limit,
    },
  ];

  return pipeline;
}

export function buildStockCountPipeline(stockThreshold: number) {
  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: 'inventories',
        localField: '_id',
        foreignField: 'productId',
        as: 'inventory',
      },
    },
    {
      $addFields: {
        totalStock: { $sum: '$inventory.quantity' },
      },
    },
    {
      $match: {
        totalStock: stockThreshold === 0 ? 0 : { $gt: 0, $lte: stockThreshold },
      },
    },
    {
      $count: 'count',
    },
  ];

  return pipeline;
}

type FlatProduct = BulkAddProductsSchema['body']['products'][number];
type NormalizedProduct = Omit<Product, 'createdAt' | 'updatedAt' | '_id'>;

export function normalizeProductFields(flat: FlatProduct): NormalizedProduct {
  const product: NormalizedProduct = {
    name: flat.name,
    description: flat.description,
    shortDescription: flat.shortDescription,
    sku: flat.sku,
    barcode: flat.barcode,
    vat: flat.vat,
    costPrice: flat.costPrice,
    salePrice: flat.salePrice,
    noOfUnits: flat.noOfUnits,
    categories: flat.categories,
    images: flat.images,
    isActive: flat.isActive,
    visibility: flat.visibility,
    hasVolumeDiscount: flat.hasVolumeDiscount,
    slug: '',
  };

  product.slug = generateSlug(product.name);
  product.dimensions = {
    length: parseOptionalFloat(flat['dimensions.length']) ?? 0,
    width: parseOptionalFloat(flat['dimensions.width']) ?? 0,
    height: parseOptionalFloat(flat['dimensions.height']) ?? 0,
  };

  product.supplier = {
    number: flat['supplier.number'] || '',
    name: flat['supplier.name'] || '',
    location: flat['supplier.location'] || '',
    countryOfOrigin: flat['supplier.countryOfOrigin'] || '',
    hsCode: flat['supplier.hsCode'] || '',
  };

  return product;
}

function parseOptionalFloat(value: string | number | undefined): number {
  if (!value || value.toString().trim() === '') return 0;
  const num = parseFloat(value.toString());
  return isNaN(num) ? 0 : num;
}
