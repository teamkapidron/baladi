import { z } from 'zod';
import { isValidObjectId } from 'mongoose';
import { UserType } from '@repo/types/user';
import { UserStatusFilter } from '@/types/user.types';
import { dateSchema } from '@/validators/schemas/date.schema';

export const getAllUsersSchema = z.object({
  query: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .optional()
      .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: 'Invalid email address',
      }),
    userType: z.nativeEnum(UserType).optional(),
    status: z.nativeEnum(UserStatusFilter).optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z.enum(['asc', 'desc']).optional(),
  }),
});

export const getUserDetailsSchema = z.object({
  params: z.object({
    userId: z
      .string()
      .min(1, 'User ID is required')
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid user ID format',
      }),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    userId: z
      .string()
      .min(1, 'User ID is required')
      .refine((val) => isValidObjectId(val), {
        message: 'Invalid user ID format',
      }),
    isApprovedByAdmin: z.boolean().optional(),
    userType: z.nativeEnum(UserType),
  }),
});

export const getUserRegistrationGraphDataSchema = z.object({
  query: z
    .object({
      from: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
        .optional(),
      to: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
        .optional(),
    })
    .superRefine((data, ctx) => {
      if (data.from && data.to) {
        const fromDate = new Date(data.from);
        const toDate = new Date(data.to);
        if (fromDate > toDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'From date cannot be after to date',
            path: ['from'],
          });
        }
      }
    }),
});

export const getUserStatsSchema = z.object({
  query: z.object({
    from: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
      .optional(),
    to: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
      .optional(),
  }),
});

export const topUsersSchema = z.object({
  query: z.object({
    from: dateSchema,
    to: dateSchema,
  }),
});

export type GetAllUsersSchema = z.infer<typeof getAllUsersSchema>;
export type GetUserDetailsSchema = z.infer<typeof getUserDetailsSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type GetUserRegistrationGraphDataSchema = z.infer<
  typeof getUserRegistrationGraphDataSchema
>;
export type GetUserStatsSchema = z.infer<typeof getUserStatsSchema>;
export type TopUsersSchema = z.infer<typeof topUsersSchema>;
