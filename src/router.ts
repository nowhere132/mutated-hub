import express from 'express';
import * as gracesController from './modules/graces/graces.controller';
import { validateData } from './middlewares/validationMiddleware';
import { collectGraceSchema } from './modules/graces/dto/collect-grace.dto';
import { enhanceGraceSchema } from './modules/graces/dto/enhance-grace.dto';
import { showGraceSchema } from './modules/graces/dto/show-grace.dto';

const router = express.Router();

router.get('/health', (req, res) => {
  res.send('OK');
});

router.get('/graces/search', validateData(showGraceSchema), gracesController.show);

router.post('/graces', validateData(collectGraceSchema), gracesController.collect);

router.patch('/graces', validateData(enhanceGraceSchema), gracesController.enhance);

export default router;
