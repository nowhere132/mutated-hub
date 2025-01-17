import { z } from 'zod';

export const showGraceSchema = z.object({
  search: z.string().optional(), // ? vs. z.optional(z.string())
  tags: z.string().optional(), // tai vi express stores this as a string
});
