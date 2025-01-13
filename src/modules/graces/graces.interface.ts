import { z } from 'zod';
import { collectGraceSchema } from './dto/collect-grace.dto';
import { enhanceGraceSchema } from './dto/enhance-grace.dto';

export type CollectGraceDto = z.infer<typeof collectGraceSchema>;
export type EnhanceGraceDto = z.infer<typeof enhanceGraceSchema>;