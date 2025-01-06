import { getPgPool } from '../../database/datasource';
import { CollectGraceDto } from './graces.interface';

const collect = async (req: CollectGraceDto): Promise<number> => {
  try {
    const pool = getPgPool();
    await pool.query('SELECT graces_collect($1, $2, $3, $4)', [
      req.link,
      req.description,
      req.tags,
      'manhthd',
    ]);
    return 1;
  } catch (err) {
    console.warn('collect graced failed: ', err);
    return -1;
  }
};

const enhance = async () => {};

const show = async () => {};

export { collect, enhance, show };
