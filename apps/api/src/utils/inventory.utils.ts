import { PipelineStage } from 'mongoose';
import { getPagination } from './common/pagination.utils';
import { GetAllInventorySchema } from '@/validators/inventory.validator';

import { InventoryFilterQuery, InventoryStatus } from '@/types/inventory.types';

export function getInventoryFilterFromQuery(
  query: GetAllInventorySchema['query'],
) {
  const { page, limit, skip } = getPagination(query.page, query.limit);

  const queryObject: InventoryFilterQuery = {};

  if (query.search) {
    queryObject.$or = [
      { 'product.name': new RegExp(query.search, 'i') },
      { 'product.sku': new RegExp(query.search, 'i') },
      { 'product.barcode': new RegExp(query.search, 'i') },
    ];
  }

  if (query.status) {
    if (query.status === InventoryStatus.IN_STOCK) {
      queryObject.quantity = { $gt: 10 };
    } else if (query.status === InventoryStatus.OUT_OF_STOCK) {
      queryObject.quantity = { $eq: 0 };
    } else if (query.status === InventoryStatus.LOW_STOCK) {
      queryObject.quantity = { $lte: 10 };
    } else if (query.status === InventoryStatus.ALL) {
      queryObject.quantity = { $gte: 0 };
    }
  }

  return { queryObject, page, limit, skip };
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
