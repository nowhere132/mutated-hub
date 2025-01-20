import express from 'express';
import * as gracesService from './graces.service';
import { 
  CollectGraceDto, 
  EnhanceGraceDto, 
  ShowGraceDto, 
  LinkGraceDto,
  GetConnectionsGraceDto
} from './graces.interface';

const collect = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id = await gracesService.collect(req.body as CollectGraceDto);
  res.send({ id });
};

const enhance = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const graceId = +req.params.id;
  const result = await gracesService.enhance(graceId, req.body as EnhanceGraceDto);
  res.send({ success: result });
};

const show = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // express stores search query into req.query
  const result = await gracesService.show(req.query as ShowGraceDto);
  res.send({ success: result });
};

const link = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const result = await gracesService.link(req.body as LinkGraceDto); 
  res.send({ success: result });
}; 

const unlink = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const result = await gracesService.unlink(req.body as LinkGraceDto); 
  res.send({ success: result }); 
}; 

// originally
// const delet = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   const graceId = +req.params.id; 
//   const result = await gracesService.delet(req.body as GetConnectionsGraceDto); 
//   res.send({ success: result }); 
// };
// but then the request must contain payload {"id": 5}, while defining route as /graces/delete/:id
// makes it possible to just curl without extra payload --> the latter more convenience 
// so GetConnectionsGraces is not used at all, although it should be used in the name of uniformity 

const delet = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const graceId = +req.params.id; 
  const result = await gracesService.delet(graceId); 
  res.send({ success: result }); 
}; 

const getConnections = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const graceId = +req.params.id; 
  const result = await gracesService.getConnections(graceId); 
  res.send(result); 
}; 

export { collect, enhance, show, link, unlink, delet, getConnections };
