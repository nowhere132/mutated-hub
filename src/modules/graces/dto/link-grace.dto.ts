// using for both link and unlink (same dto)
import { z } from 'zod';

export const linkGraceSchema = z.object({
  from_grace_id: z.number(),
  to_grace_id: z.number(),
});