import mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';

export const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);
const User = mongoose.model('User', userSchema);

export async function findByUsername(username) {
  return User.findOne({ username: username }).then(data => {
    return data;
  });
}

export async function findById(id) {
  return User.findOne({ _id: id });
}
export async function createUser(user) {
  return new User(user).save().then(data => data.id);
}
