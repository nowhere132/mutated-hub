import { getPgPool } from '../../database/datasource';
import { CollectGraceDto, EnhanceGraceDto } from './graces.interface';

const collect = async (req: CollectGraceDto): Promise<number> => {
  try {
    const pool = getPgPool();
    await pool.query('SELECT graces_collect($1, $2, $3, $4)', [
      req.link,
      req.description,
      req.tags,
      'manhthd',
    ]);
    return 1; // ? why not 0 
  } catch (err) {
    console.warn('collect graces failed: ', err);
    return -1;
  }
};

const enhance = async (req: EnhanceGraceDto): Promise<number> => {
  try {
    const pool = getPgPool(); 
    await pool.query('SELECT graces_enhance($1, $2, $3)', [
      req.id, 
      req.description, 
      req.tags,
    ]);
    return 1; // mimic
  } catch (err) {
    console.warn('enhance graces failed: ', err); 
    return -1; 
  }
};

const show = async () => {};

export { collect, enhance, show };
