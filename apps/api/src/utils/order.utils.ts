import User from '@/models/user.model';
import Product from '@/models/product.model';

import type { OrderFilterQuery, OrderSortObject } from '@/types/order.types';
import type { GetAllOrdersSchema } from '@/validators/order.validator';

export async function getOrderFiltersFromQuery(
  query: GetAllOrdersSchema['query'],
) {
  const {
    page,
    limit,
    userId,
    productId,
    status,
    search,
    from,
    to,
    sortBy,
    sortOrder,
  } = query;

  let sortObject: OrderSortObject = {};
  let queryObject: OrderFilterQuery = {};
  const perPage = parseInt(limit ?? '10', 10);
  const currentPage = parseInt(page ?? '1', 10);

  if (status) {
    queryObject.status = status;
  }

  if (userId) {
    queryObject.userId = userId;
  }

  if (productId) {
    queryObject['items.productId'] = productId;
  }

  if (from && to) {
    queryObject.createdAt = {
      $gte: new Date(from),
      $lte: new Date(to),
    };
  }

  if (search) {
    const users = await User.find({
      $or: [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
      ],
    }).select('_id');

    const products = await Product.find({
      name: new RegExp(search, 'i'),
    }).select('_id');

    const userIds = users
      .map((u) => u._id?.toString())
      .filter((id): id is string => id !== undefined);
    const productIds = products
      .map((p) => p._id?.toString())
      .filter((id): id is string => id !== undefined);

    queryObject.$or = [
      { userId: { $in: userIds } },
      { 'items.productId': { $in: productIds } },
    ];
  }

  if (sortBy && sortOrder) {
    sortObject[sortBy] = sortOrder === 'asc' ? 1 : -1;
  }

  return {
    queryObject,
    sortObject,
    perPage,
    currentPage,
    skip: (currentPage - 1) * perPage,
  };
}
