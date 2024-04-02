import mysql from 'mysql2';
import SQ from 'sequelize';
import { config } from '../config.js';

const { host, user, password, database } = config.db;

export const sequelize = new SQ.Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
});

const pool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
});

// 풀 자체를 export 하기 보다는 pool에서 비동기 작업을 처리해주는 모듈을 export해주자.
export const db = pool.promise();
