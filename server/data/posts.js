import mongoose from 'mongoose';
import * as userRepository from '../data/auth.js';
import { useVirtualId } from '../db/database.js';

const postSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(postSchema);

const Post = mongoose.model('Post', postSchema);

export async function getAll() {
  return Post.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Post.find({ username: username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  return Post.findById(id);
}

export async function create(text, userId) {
  return userRepository.findById(userId).then(user =>
    new Post({
      text: text,
      userId: userId,
      username: user.username,
      name: user.name,
      url: user.url,
    }).save()
  );
}

export async function update(id, text) {
  return Post.findByIdAndUpdate(id, { text: text }, { returnOriginal: false });
}

export async function remove(id) {
  return Post.findByIdAndDelete(id);
}
