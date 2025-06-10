import { z } from 'zod';

// Session token schema
export const sessionTokenSchema = z.object({
  expirationDate: z.string(),
  token: z.string(),
});

export type SessionToken = z.infer<typeof sessionTokenSchema>;

// Get token response schema
export const getTokenResponseSchema = z.object({
  value: sessionTokenSchema,
});

export type GetTokenResponse = z.infer<typeof getTokenResponseSchema>;
