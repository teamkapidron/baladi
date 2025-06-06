// Node Modules

// Schemas
import Product from '@/models/product.model';
import Favorite from '@/models/favorite.model';

// Utils
import { sendResponse } from '@/utils/common/response.util';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  GetFavoritesSchema,
  AddToFavoritesSchemaType,
  RemoveFromFavoritesSchemaType,
} from '@/validators/favourite.validator';
import type { Request, Response } from 'express';
import type { FavoriteAggregateType } from '@/types/favourite.types';

export const getUserFavorites = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { page, limit } = req.query as GetFavoritesSchema['query'];

    const perPage = parseInt(limit ?? '10', 10);
    const currentPage = parseInt(page ?? '1', 10);

    const favorites = await Favorite.aggregate<FavoriteAggregateType>([
      { $match: { userId } },
      {
        $lookup: {
          from: 'products',
          localField: 'productID',
          foreignField: '_id',
          as: 'productID',
        },
      },
      { $unwind: '$productID' },
      {
        $lookup: {
          from: 'categories',
          localField: 'productID.categories',
          foreignField: '_id',
          as: 'productID.categories',
        },
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          product: {
            _id: 1,
            name: 1,
            salePrice: 1,
            unitPrice: 1,
            slug: 1,
            images: 1,
            shortDescription: 1,
            categories: {
              _id: 1,
              name: 1,
              slug: 1,
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: perPage * (currentPage - 1) },
      { $limit: perPage },
    ]);

    sendResponse(res, 200, 'Favorites fetched successfully', {
      favorites,
      totalFavorites: favorites.length,
      page: currentPage,
      perPage,
      totalPages: Math.ceil(favorites.length / perPage),
    });
  },
);

export const addToFavorites = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { productId } = req.params as AddToFavoritesSchemaType['params'];

    const product = await Product.findById(productId);
    if (!product) {
      throw new ErrorHandler(404, 'Product not found', 'NOT_FOUND');
    }

    const existingFavorite = await Favorite.findOne({
      userId,
      productId,
    });
    if (existingFavorite) {
      throw new ErrorHandler(
        400,
        'Product already in favorites',
        'BAD_REQUEST',
      );
    }

    await Favorite.create({
      userId,
      productId,
    });

    sendResponse(res, 201, 'Product added to favorites');
  },
);

export const removeFromFavorites = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { productId } = req.params as RemoveFromFavoritesSchemaType['params'];

    const result = await Favorite.findOneAndDelete({
      userId,
      productId,
    });
    if (!result) {
      throw new ErrorHandler(
        404,
        'Product not found in favorites',
        'NOT_FOUND',
      );
    }

    sendResponse(res, 200, 'Product removed from favorites');
  },
);
