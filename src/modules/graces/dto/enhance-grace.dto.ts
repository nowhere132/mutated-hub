import { z } from 'zod';

export const enhanceGraceSchema = z.object({
  description: z.optional(z.string()),
  tags: z.string().array().optional(),
});