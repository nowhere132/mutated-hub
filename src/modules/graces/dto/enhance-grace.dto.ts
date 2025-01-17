import { z } from 'zod';

export const enhanceGraceSchema = z.object({
  id: z.number(),
  description: z.optional(z.string()),
  tags: z.string().array().optional(),
});
