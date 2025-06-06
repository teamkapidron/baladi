import { Visibility } from '@repo/types/product';

import type { ProductFilter } from '@/types/product.types';
import type { GetAllProductsSchema } from '@/validators/product.validator';

export function getProductFilterFromQuery(
  query: GetAllProductsSchema['query'],
) {
  const {
    search,
    page,
    limit,
    category,
    minPrice,
    maxPrice,
    isActive,
    visibility,
  } = query;

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

  if (minPrice || maxPrice) {
    queryObject.salePrice = {};
    if (minPrice) {
      queryObject.salePrice.$gte = parseInt(minPrice, 10);
    }
    if (maxPrice) {
      queryObject.salePrice.$lte = parseInt(maxPrice, 10);
    }
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
