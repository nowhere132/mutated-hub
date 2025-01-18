import { getPgPool } from '../../database/datasource';
import { CollectGraceDto, EnhanceGraceDto, ShowGraceDto } from './graces.interface';

const collect = async (req: CollectGraceDto): Promise<number> => {
  try {
    const pool = getPgPool();
    const result = await pool.query('SELECT graces_collect($1, $2, $3, $4)', [
      req.link,
      req.description,
      req.tags,
      'manhthd',
    ]);
    return result.rows[0].graces_collect;
  } catch (err) {
    console.warn('collect graces failed: ', err);
    return -1;
  }
};

const enhance = async (graceId: number, req: EnhanceGraceDto): Promise<number> => {
  try {
    const pool = getPgPool();
    const result = await pool.query('SELECT graces_enhance($1, $2, $3)', [
      graceId,
      req.description,
      req.tags,
    ]);
    return result.rows[0].graces_enhance;
  } catch (err) {
    console.warn('enhance graces failed: ', err);
    return -1;
  }
};

// i used to think that this function is to get all the details of an item
// by id, but second thought makes me think this is not a very useful feature
// show() is more likely to query/filter by tags/keyword --> do that
const show = async (req: ShowGraceDto) => {
  try {
    const tagsArr = req.tags ? req.tags.split(',') : null;

    const pool = getPgPool();
    const result = await pool.query('SELECT * FROM graces_show($1, $2)', [
      req.search || null,
      tagsArr,
    ]);

    return result.rows;
  } catch (err) {
    console.warn('query graces failed: ', err);
    return null;
  }
};

export { collect, enhance, show };
