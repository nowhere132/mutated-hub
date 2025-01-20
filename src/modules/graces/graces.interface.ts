import { z } from 'zod';
import { collectGraceSchema } from './dto/collect-grace.dto';
import { enhanceGraceSchema } from './dto/enhance-grace.dto';
import { showGraceSchema } from './dto/show-grace.dto';
import { linkGraceSchema } from './dto/link-grace.dto';
import { getConnectionsGraceSchema } from './dto/get-connections-grace.dto';

export type CollectGraceDto = z.infer<typeof collectGraceSchema>;
export type EnhanceGraceDto = z.infer<typeof enhanceGraceSchema>;
export type ShowGraceDto = z.infer<typeof showGraceSchema>;
export type LinkGraceDto = z.infer<typeof linkGraceSchema>; 
export type GetConnectionsGraceDto = z.infer<typeof getConnectionsGraceSchema>;

export interface GraceNode {
  this: {
    id: string, 
    data: {
      label: string, 
      description?: string, 
      tags?: string[];
    };
  };

  neighbors: Array<{
    id: string, 
    data: {
      label: string; 
      description?: string, 
      tags?: string[],
    };
  }>; 

  edges: Array<{
    id: string, 
    source: string, 
    target: string, 
  }>;
}

