import { addDays } from 'date-fns';
import { ScheduledEvent, Context } from 'aws-lambda';

import connectToMongo from '@/database/mongo.db';

import { sendMail } from '@mail/mail.util';
import Inventory from '@models/inventory.model';
import { inventoryAlertTemplate } from '@/templates/mail.templates';

export async function handler(event: ScheduledEvent, context: Context) {
  await connectToMongo();

  const today = new Date();
  const thirtyDaysFromNow = addDays(today, 30);

  const result = await Inventory.aggregate([
    {
      $match: {
        expirationDate: {
          $gte: today,
          $lte: thirtyDaysFromNow,
        },
      },
    },
    {
      $group: {
        _id: '$productId',
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
    {
      $project: {
        _id: 0,
        productId: '$_id',
        productName: '$product.name',
        productImage: '$product.image',
        totalQuantity: 1,
      },
    },
  ]);

  const products = result.map((product) => ({
    productName: product.productName,
    productImage: product.productImage,
    totalQuantity: product.totalQuantity,
  }));

  const template = inventoryAlertTemplate({ products });

  return {
    statusCode: 200,
  };
}
