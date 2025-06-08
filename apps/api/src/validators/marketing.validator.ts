import { z } from 'zod';
import { CampaignType } from '@repo/types/campaign';

export const newsletterStatsSchema = z.object({});

export const createCampaignSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    type: z.nativeEnum(CampaignType),
    productsIds: z.array(z.string()).min(1, 'Products IDs are required'),
  }),
});

export const newsLetterPreviewSchema = z.object({
  body: z.object({
    type: z.nativeEnum(CampaignType),
    productsIds: z.array(z.string()).min(1, 'Products IDs are required'),
  }),
});

export type NewsletterStatsSchema = z.infer<typeof newsletterStatsSchema>;
export type CreateCampaignSchema = z.infer<typeof createCampaignSchema>;
export type NewsLetterPreviewSchema = z.infer<typeof newsLetterPreviewSchema>;
