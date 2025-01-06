import express from 'express';
import * as gracesController from './modules/graces/graces.controller';
import { validateData } from './middlewares/validationMiddleware';
import { collectGraceSchema } from './modules/graces/dto/collect-grace.dto';

const router = express.Router();

router.get('/health', (req, res) => {
  res.send('OK');
});

router.post('/graces', validateData(collectGraceSchema), gracesController.collect);

export default router;
