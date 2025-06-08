// Node Modules

// Schemas
import Product from '@/models/product.model';
import Campaign from '@/models/campaign.model';
import Subscriber from '@/models/subscriber.model';

// Utils
import { sendResponse } from '@/utils/common/response.util';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  CreateCampaignSchema,
  NewsLetterPreviewSchema,
} from '@/validators/marketing.validator';
import type { Request, Response } from 'express';
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

    sendResponse(res, 200, 'Newsletter preview fetched successfully');
  },
);
