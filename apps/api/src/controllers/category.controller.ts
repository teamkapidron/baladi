// Node Modules

// Schemas
import Category from '@/models/category.model';
import InventoryWastage from '@/models/inventory-wastage.model';

// Utils
import { generateSlug } from '@/utils/common/string.util';
import { sendResponse } from '@/utils/common/response.util';
import { getDateMatchStage } from '@/utils/common/date.util';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type { Request, Response } from 'express';
import type { CategoryGraphData, CategoryStats } from '@/types/category.types';
import type { HierarchicalCategory } from '@repo/types/category';
import type {
  // User
  GetCategoriesSchema,
  GetCategoriesFlattenedSchema,
  GetCategoryByIdSchema,

  // Admin
  GetAllCategoriesFlattenedSchema,
  GetCategoryStatsSchema,
  CreateCategorySchema,
  UpdateCategorySchema,
  DeleteCategorySchema,
  GetCategoryGraphDataSchema,
} from '@/validators/category.validator';
import { OrderStatus } from '@repo/types/order';
import Order from '@/models/order.model';

export const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit } = req.query as GetCategoriesSchema['query'];

    const perPage = parseInt(limit ?? '10', 10);
    const currentPage = parseInt(page ?? '1', 10);

    const filter = { visibleToStore: true };

    const categories = await Category.find(filter)
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
      .lean();

    const total = await Category.countDocuments(filter);

    const categoryMap = new Map<string, HierarchicalCategory>();
    const rootCategories: HierarchicalCategory[] = [];

    categories.forEach((category) => {
      const id = category._id.toString();
      const formattedCategory: HierarchicalCategory = {
        _id: id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        isActive: category.isActive,
        visibleToStore: category.visibleToStore,
        children: [],
      };

      categoryMap.set(id, formattedCategory);

      if (!category.parentId) {
        rootCategories.push(formattedCategory);
      }
    });

    categories.forEach((category) => {
      if (category.parentId) {
        const parentId = category.parentId.toString();
        const parent = categoryMap.get(parentId);
        const child = categoryMap.get(category._id.toString());

        if (parent && child) {
          parent.children = parent.children || [];
          parent.children.push(child);
        }
      }
    });

    sendResponse(res, 200, 'Categories fetched successfully', {
      categories: rootCategories,
      total,
      currentPage,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  },
);

export const getCategoriesFlattened = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit } = req.query as GetCategoriesFlattenedSchema['query'];

    const perPage = parseInt(limit ?? '10', 100);
    const currentPage = parseInt(page ?? '1', 10);

    const filter = { visibleToStore: true };

    const categories = await Category.find(filter)
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ name: 1 })
      .lean();

    const total = await Category.countDocuments(filter);

    sendResponse(res, 200, 'Categories fetched successfully', {
      categories,
      total,
      currentPage,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  },
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params as GetCategoryByIdSchema['params'];

    const category = await Category.findById(categoryId);
    if (!category) {
      throw new ErrorHandler(404, 'Category not found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Category fetched successfully', { category });
  },
);

export const getAllCategories = asyncHandler(
  async (_: Request, res: Response) => {
    const categories = await Category.find().sort({ createdAt: -1 }).lean();

    const categoryMap = new Map<string, HierarchicalCategory>();
    const rootCategories: HierarchicalCategory[] = [];

    categories.forEach((category) => {
      const id = category._id.toString();
      const formattedCategory: HierarchicalCategory = {
        _id: id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        isActive: category.isActive,
        visibleToStore: category.visibleToStore,
        children: [],
      };

      categoryMap.set(id, formattedCategory);

      if (!category.parentId) {
        rootCategories.push(formattedCategory);
      }
    });

    categories.forEach((category) => {
      if (category.parentId) {
        const parentId = category.parentId.toString();
        const parent = categoryMap.get(parentId);
        const child = categoryMap.get(category._id.toString());

        if (parent && child) {
          parent.children = parent.children || [];
          parent.children.push(child);
        }
      }
    });

    sendResponse(res, 200, 'Categories fetched successfully', {
      categories: rootCategories,
    });
  },
);

export const getAllCategoriesFlattened = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit } =
      req.query as GetAllCategoriesFlattenedSchema['query'];

    const perPage = parseInt(limit ?? '100', 10);
    const currentPage = parseInt(page ?? '1', 10);

    const categories = await Category.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
      .lean();

    const total = await Category.countDocuments();

    sendResponse(res, 200, 'Categories fetched successfully', {
      categories,
      total,
      currentPage,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  },
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, slug, image, isActive, visibleToStore, parentId } =
      req.body as CreateCategorySchema['body'];

    let newSlug = slug;
    if (!newSlug) {
      newSlug = generateSlug(name ?? '');
    }

    const category = await Category.create({
      name,
      slug: newSlug,
      image,
      isActive,
      visibleToStore,
      parentId: parentId === '' ? null : parentId,
    });

    sendResponse(res, 201, 'Category created successfully', { category });
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params as UpdateCategorySchema['params'];
    const { name, slug, image, isActive, visibleToStore, parentId } =
      req.body as UpdateCategorySchema['body'];

    const category = await Category.findById(categoryId);
    if (!category) {
      throw new ErrorHandler(404, 'Category not found', 'NOT_FOUND');
    }

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
      name,
      slug,
      image,
      isActive,
      visibleToStore,
      parentId,
    });

    sendResponse(res, 200, 'Category updated successfully', {
      category: updatedCategory,
    });
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params as DeleteCategorySchema['params'];

    const category = await Category.findById(categoryId);
    if (!category) {
      throw new ErrorHandler(404, 'Category not found', 'NOT_FOUND');
    }

    await category.deleteOne();

    sendResponse(res, 200, 'Category deleted successfully');
  },
);

export const getCategoryStats = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query as GetCategoryStatsSchema['query'];

    const matchStage = getDateMatchStage('createdAt', from, to);

    const [stats] = await Category.aggregate<CategoryStats>([
      { $match: matchStage },
      {
        $facet: {
          totalCategories: [{ $count: 'count' }],
          nestedCategories: [
            { $match: { parentId: { $ne: null } } },
            { $count: 'count' },
          ],
          activeCategories: [
            { $match: { isActive: true } },
            { $count: 'count' },
          ],
          inactiveCategories: [
            { $match: { isActive: false } },
            { $count: 'count' },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          totalCategories: 1,
          nestedCategories: 1,
          activeCategories: 1,
          inactiveCategories: 1,
        },
      },
    ]);

    if (!stats) {
      throw new ErrorHandler(404, 'No stats found', 'NOT_FOUND');
    }

    sendResponse(res, 200, 'Category stats fetched successfully', { stats });
  },
);

export const getCategoryGraphData = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to, all } = req.query as GetCategoryGraphDataSchema['query'];
    const isAll = all === 'true';

    const matchStage = getDateMatchStage('createdAt', from, to);

    const orderPipeline = [
      {
        $match: {
          ...matchStage,
          status: { $ne: OrderStatus.CANCELLED },
        },
      },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      { $unwind: '$productInfo' },
      { $unwind: '$productInfo.categories' },
      {
        $lookup: {
          from: 'categories',
          localField: 'productInfo.categories',
          foreignField: '_id',
          as: 'categoryInfo',
        },
      },
      { $unwind: '$categoryInfo' },
      {
        $addFields: {
          revenue: {
            $multiply: ['$items.priceWithVat', '$items.quantity'],
          },
          cost: {
            $multiply: ['$productInfo.costPrice', '$items.quantity'],
          },
          profit: {
            $multiply: [
              {
                $subtract: [
                  { $subtract: ['$items.price', '$productInfo.costPrice'] },
                  { $ifNull: ['$items.bulkDiscount', 0] },
                ],
              },
              '$items.quantity',
            ],
          },
        },
      },
      {
        $group: {
          _id: '$categoryInfo._id',
          categoryName: { $first: '$categoryInfo.name' },
          totalRevenue: { $sum: '$revenue' },
          totalCost: { $sum: '$cost' },
          grossProfit: { $sum: '$profit' },
        },
      },
    ];

    const wastagePipeline = [
      {
        $match: matchStage,
      },
      { $unwind: '$categories' },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      { $unwind: '$productInfo' },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categoryInfo',
        },
      },
      { $unwind: '$categoryInfo' },
      {
        $group: {
          _id: '$categoryInfo._id',
          categoryName: { $first: '$categoryInfo.name' },
          totalWastageQuantity: { $sum: '$quantity' },
          totalWastageAmount: {
            $sum: {
              $multiply: ['$quantity', '$productInfo.costPrice'],
            },
          },
        },
      },
    ];

    let combinedRevenue = 0;
    let combinedProfit = 0;
    let combinedWastageAmount = 0;
    let combinedWastageQuantity = 0;

    const [orderStats, wastageStats, allCategories] = await Promise.all([
      Order.aggregate(orderPipeline),
      InventoryWastage.aggregate(wastagePipeline),
      Category.find({}, { _id: 1, name: 1 }).lean(),
    ]);

    const orderStatsMap = new Map(
      orderStats.map((item) => [item._id.toString(), item]),
    );
    const wastageStatsMap = new Map(
      wastageStats.map((item) => [item._id.toString(), item]),
    );

    const combinedData = allCategories.map((category) => {
      const categoryId = category._id.toString();
      const orderData = orderStatsMap.get(categoryId);
      const wastageData = wastageStatsMap.get(categoryId);

      const totalRevenue = orderData?.totalRevenue || 0;
      const grossProfit = orderData?.grossProfit || 0;
      const totalWastageAmount = wastageData?.totalWastageAmount || 0;
      const totalWastageQuantity = wastageData?.totalWastageQuantity || 0;

      combinedRevenue += totalRevenue;
      combinedProfit += grossProfit;
      combinedWastageAmount += totalWastageAmount;
      combinedWastageQuantity += totalWastageQuantity;

      return {
        _id: categoryId,
        categoryName: category.name,
        totalRevenue,
        grossProfit,
        totalWastageQuantity,
        totalWastageAmount,
        totalValue: totalRevenue + grossProfit + totalWastageAmount,
      };
    });
    combinedData.sort((a, b) => b.totalValue - a.totalValue);

    if (isAll) {
      sendResponse(res, 200, 'Category graph data fetched successfully', {
        categories: combinedData,
        combinedRevenue,
        combinedProfit,
        combinedWastageAmount,
        combinedWastageQuantity,
      });
      return;
    }
    const top25Categories = combinedData.slice(0, 25);

    sendResponse(res, 200, 'Category graph data fetched successfully', {
      categories: top25Categories,
      combinedRevenue,
      combinedProfit,
      combinedWastageAmount,
      combinedWastageQuantity,
    });
  },
);
