import express from 'express';
import * as gracesController from './modules/graces/graces.controller';
import { validateData } from './middlewares/validationMiddleware';
import { collectGraceSchema } from './modules/graces/dto/collect-grace.dto';
import { enhanceGraceSchema } from './modules/graces/dto/enhance-grace.dto'
import { getPgPool } from './database/datasource';
// import { showSchema } from ';
const router = express.Router();

router.get('/health', (req, res) => {
  res.send('OK');
});

router.post('/graces', validateData(collectGraceSchema), gracesController.collect);

// i just gotta see what is going on :) 
// nvm i could have just read the db schema
router.get('/schema', async(req, res) => {
  const pool = getPgPool(); 
  try {
    const query = `
      select table_name, column_name, data_type 
      from information_schema.columns 
      where table_schema = 'public' 
      order by table_name, ordinal_position; 
    `;

    const db = await pool.query(query);

    res.send(db); 
  } catch (e) {
    console.error('cannot read db schema', e);
    res.status(500).json({error: 'cannot read db schema'});
  }
});

router.patch('/graces', validateData(enhanceGraceSchema), gracesController.enhance)


export default router;
