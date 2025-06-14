// Node Modules

// Schemas
import Product from '@/models/product.model';
import Campaign from '@/models/campaign.model';
import Subscriber from '@/models/subscriber.model';

// Utils
import { sendResponse } from '@/utils/common/response.util';
import {
  newArrivalTemplate,
  productPromotionTemplate,
} from '@/templates/newsletter.template';
import {
  multiProductPromotionTemplate,
  promotionPosterTemplate,
} from '@/templates/poster.template';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  CreateCampaignSchema,
  NewsLetterPreviewSchema,
  PreviewPromotionPosterSchema,
} from '@/validators/marketing.validator';
import type { Request, Response } from 'express';
import { CampaignType } from '@repo/types/campaign';
import { SubscriberStatus } from '@repo/types/subscribers';

export const newsletterStats = asyncHandler(
  async (_: Request, res: Response) => {
    const campaignCount = await Campaign.find().countDocuments();
    const subscriberCount = await Subscriber.find().countDocuments();
    const unsubscribedSubscribers = await Subscriber.find({
      status: SubscriberStatus.UNSUBSCRIBED,
    }).countDocuments();

    sendResponse(res, 200, 'Newsletter stats fetched successfully', {
      campaignCount,
      subscriberCount,
      unsubscribedSubscribers,
    });
  },
);

export const createCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, type, productsIds } =
      req.body as CreateCampaignSchema['body'];

    const products = await Product.find({ _id: { $in: productsIds } });

    if (products.length !== productsIds.length) {
      throw new ErrorHandler(400, 'Some products are not found', 'BAD_REQUEST');
    }

    const campaign = await Campaign.create({
      title,
      description,
      type,
      productsIds,
    });

    sendResponse(res, 201, 'Campaign created successfully', { campaign });
  },
);

export const newsLetterPreview = asyncHandler(
  async (req: Request, res: Response) => {
    const { type, productsIds } = req.body as NewsLetterPreviewSchema['body'];

    const products = await Product.find({ _id: { $in: productsIds } }).lean();

    if (products.length !== productsIds.length) {
      throw new ErrorHandler(400, 'Some products are not found', 'BAD_REQUEST');
    }

    let html = '';

    const productsData = products.map((product) => ({
      name: product.name,
      price: product.salePrice,
      image: product.images?.[0] ?? '',
    }));

    if (type === CampaignType.NEW_ARRIVAL) {
      html = newArrivalTemplate(productsData);
    } else if (type === CampaignType.PROMOTION) {
      html = productPromotionTemplate(productsData);
    }

    sendResponse(res, 200, 'Newsletter preview fetched successfully', { html });
  },
);

export const previewPromotionPoster = asyncHandler(
  async (req: Request, res: Response) => {
    const { posterType, productsIds } =
      req.body as PreviewPromotionPosterSchema['body'];

    const products = await Product.find({ _id: { $in: productsIds } }).lean();

    if (products.length !== productsIds.length) {
      throw new ErrorHandler(400, 'Some products are not found', 'BAD_REQUEST');
    }

    const productsData = products.map((product) => ({
      name: product.name,
      price: product.salePrice,
      image: product.images?.[0] ?? '',
      tagline: 'Buy 3 or more and get 10% off',
      promotionTitle: 'Special Offer',
    }));

    if (productsData.length > 3) {
      throw new ErrorHandler(
        400,
        'You can only select up to 3 products',
        'BAD_REQUEST',
      );
    }

    let html: string[] = [];

    if (productsData.length === 1) {
      html = [
        promotionPosterTemplate({
          name: productsData[0]?.name ?? '',
          price: productsData[0]?.price ?? 0,
          image: productsData[0]?.image ?? '',
          tagline: 'Buy 3 or more and get 10% off',
          promotionTitle: 'Special Offer',
        }),
      ];
    }

    html = [
      multiProductPromotionTemplate({
        promotionTitle: 'Special Offer',
        tagline: 'Buy 3 or more and get 10% off',
        items: productsData,
      }),
    ];

    sendResponse(res, 200, 'Promotion poster preview fetched successfully', {
      html,
    });
  },
);
