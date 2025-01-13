import express from 'express';
import * as gracesService from './graces.service';
import { CollectGraceDto, EnhanceGraceDto } from './graces.interface';

const collect = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = await gracesService.collect(req.body as CollectGraceDto);
  res.send({ id });
};

const enhance = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const graceID = +(req.params.id); 
  const result = await gracesService.enhance({id: graceID, ...req.body} as EnhanceGraceDto);
  res.send({ success: result !== -1 });
};

export { collect, enhance };
