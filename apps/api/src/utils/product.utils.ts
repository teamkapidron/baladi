import { PipelineStage } from 'mongoose';
import { Visibility } from '@repo/types/product';

import type { ProductFilter } from '@/types/product.types';
import type { GetAllProductsSchema } from '@/validators/product.validator';

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
    queryObject.category = category;
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
