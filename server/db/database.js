import MongoDB from 'mongodb';
import { config } from '../config.js';

// 데이터베이스와 관련된 기능을 모아둔 모듈이다.
// 외부에서는 내부에서 뭘 하는지 몰라도 호출만 하면 사용가능하게 하자.

const uri = config.db.host;

export let db;

// db생성 함수
export async function connectDB() {
  return MongoDB.MongoClient.connect(uri).then(client => {
    db = client.db();
  });
}

export function getUsers() {
  return db.collection('users');
}

export function getPosts() {
  return db.collection('posts');
}
