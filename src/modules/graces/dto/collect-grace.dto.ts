import { z } from 'zod';

export const collectGraceSchema = z.object({
  link: z.string(),
  description: z.optional(z.string()),
  tags: z.string().array().optional(),
});
