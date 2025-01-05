import express from 'express';
import * as gracesService from './graces.service';

const collect = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = await gracesService.collect(req.body.link, undefined, undefined);
  res.send({ id });
};

export { collect };
