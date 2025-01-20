// using for both delete node and get connections for node 
import { z } from 'zod'; 

export const getConnectionsGraceSchema = z.object({
  id: z.number(),
});