import express from 'express';
import * as gracesController from './modules/graces/graces.controller';

const router = express.Router();

router.get('/health', (req, res) => {
  res.send('OK');
});

router.post('/graces', gracesController.collect);

export default router;
