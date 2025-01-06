import { z } from 'zod';
import { collectGraceSchema } from './dto/collect-grace.dto';

export type CollectGraceDto = z.infer<typeof collectGraceSchema>;
