import * as userRepository from '../data/auth.js';
import { db } from '../db/database.js';

const SELECT_JOIN = `SELECT po.id, po.text, po.createdAt, po.userid, us.username, us.name, us.url 
                    FROM post as po JOIN user as us 
                    ON po.userid = us.id`;

const ORDER_DESC = 'ORDER BY po.createdAt DESC';
// 두개의 연관있는 테이블을 조인해서 읽어야한다.
export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then(result => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username = ? ${ORDER_DESC}`, [username])
    .then(result => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE po.id = ? ${ORDER_DESC}`, [id])
    .then(result => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute(
      `
  INSERT INTO post (text,createdAt,userid)  
  VALUES (?,?,?)
 `,
      [text, new Date(), userId]
    )
    .then(result => getById(result[0].insertId));
}

export async function update(id, text) {
  return db
    .execute(
      `
    UPDATE post
    SET text = ?
    WHERE id = ?
  `,
      [text, id]
    ) //
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute(
    `
    DELETE FROM post WHERE id = ?
  `,
    [id]
  );
}
