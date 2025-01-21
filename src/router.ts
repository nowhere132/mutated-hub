import express from 'express';
import * as gracesController from './modules/graces/graces.controller';
import { validateData } from './middlewares/validationMiddleware';
import { collectGraceSchema } from './modules/graces/dto/collect-grace.dto';
import { enhanceGraceSchema } from './modules/graces/dto/enhance-grace.dto';
import { showGraceSchema } from './modules/graces/dto/show-grace.dto';
import { linkGraceSchema } from './modules/graces/dto/link-grace.dto';

const router = express.Router();

router.get('/health', (req, res) => {
  res.send('OK');
});

// ----- no param gang -----
router.get('/graces/search', validateData(showGraceSchema), gracesController.show);
router.get('/graces/graph', gracesController.getKnowledgeGraph);
router.post('/graces', validateData(collectGraceSchema), gracesController.collect);
router.post('/graces/link', validateData(linkGraceSchema), gracesController.link); 
router.delete('/graces/link', validateData(linkGraceSchema), gracesController.unlink); 
// or router.post('/graces/unlink', validateData(linkGraceSchema), gracesController.unlink); ?
// i read that 'delete' is more restful than post /delete? 

// ----- param gang -----
router.delete('/graces/:id', gracesController.delet); 
router.patch('/graces/:id', validateData(enhanceGraceSchema), gracesController.enhance);
router.get('/graces/:id/connections', gracesController.getConnections);

// you said this first class but i must not have understood it, but when does the order 
// of route definition matter? in this case, which order makes the most sense / is best practice? 

export default router;
