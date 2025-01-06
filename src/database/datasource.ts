import * as pg from 'pg';

let connectedPool: pg.Pool;

const createPgPool = (): pg.Pool => {
  const pool = new pg.Pool({
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: +(process.env.POSTGRES_PORT ?? '5432'),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  pool.on('error', (err) => {
    console.error('PgPool got unexpected error: ', err);
    process.exit(-1);
  });

  return pool;
};

export const getPgPool = (): pg.Pool => {
  if (connectedPool !== undefined) {
    return connectedPool;
  }

  connectedPool = createPgPool();
  return connectedPool;
};
