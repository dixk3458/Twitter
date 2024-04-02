import { getUsers } from '../db/database.js';
import MongoDB from 'mongodb';

const ObjectId = MongoDB.ObjectId;

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username: username })
    .then(user => mapOptionalUser(user));
}

export async function findById(id) {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then(user => mapOptionalUser(user));
}
export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then(data => data.insertedId.toString());
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id } : user;
}
