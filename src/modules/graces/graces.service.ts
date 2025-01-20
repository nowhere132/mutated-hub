import { getPgPool } from '../../database/datasource';
import { 
  CollectGraceDto, 
  EnhanceGraceDto, 
  ShowGraceDto, 
  LinkGraceDto, 
  GetConnectionsGraceDto, 
  GraceNode
} from './graces.interface';

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

const link = async (req: LinkGraceDto): Promise<number> => {
  try {
    const pool = getPgPool(); 
    await pool.query('SELECT * FROM graces_link($1, $2)', [
      req.from_grace_id, 
      req.to_grace_id
    ]);
    return 0;
  } catch (err) {
    console.warn('link graces failed: ', err);
    return -1;
  }
}; 

const unlink = async (req: LinkGraceDto): Promise<number> => {
  try {
    const pool = getPgPool(); 
    await pool.query('SELECT * FROM graces_unlink($1, $2)', [
      req.from_grace_id, 
      req.to_grace_id
    ]);
    return 0;
  } catch (err) {
    console.warn('unlink graces failed: ', err);
    return -1;
  }
}; 

// cannot name a function `delete` -- rserved word 
const delet = async (id: number): Promise<number> => {
  try {
    const pool = getPgPool(); 
    await pool.query('SELECT graces_delete($1)', [id]);
    return 0; 
  } catch (err) {
    console.warn('delete grace failed: ', err);
    return -1;
  }
}; 

const getConnections = async (id: number): Promise<GraceNode | null> => {
  try {
    const pool = getPgPool(); 
    const result = await pool.query('SELECT * FROM graces_get_connections($1)', [id]);
    console.debug(result); 
    return result.rows[0];
  } catch (err) {
    console.warn('get grace node information failed: ', err);
    return null;
  }
}; 

export { collect, enhance, show, link, unlink, delet, getConnections };
