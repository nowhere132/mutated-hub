import express from 'express';
import * as gracesService from './graces.service';
import { CollectGraceDto } from './graces.interface';

const collect = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = await gracesService.collect(req.body as CollectGraceDto);
  res.send({ id });
};

export { collect };
