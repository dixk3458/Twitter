import mysql from 'mysql2';
import { config } from '../config.js';

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// 풀 자체를 export 하기 보다는 pool에서 비동기 작업을 처리해주는 모듈을 export해주자.
export const db = pool.promise();
