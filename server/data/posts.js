import * as userRepository from '../data/auth.js';
import { getPosts } from '../db/database.js';

import MongoDB from 'mongodb';

const ObjectId = MongoDB.ObjectId;

export async function getAll() {
  return getPosts()
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(data => mapPosts(data));
}

export async function getAllByUsername(username) {
  return getPosts()
    .find({ username: username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(data => mapPosts(data));
}

export async function getById(id) {
  return getPosts()
    .findOne({ _id: new ObjectId(id) })
    .then(data => mapOptionalPost(data));
}

export async function create(text, userId) {
  const { username, name, url } = await userRepository.findById(userId);

  const post = {
    text: text,
    createdAt: new Date(),
    userId: userId,
    username: username,
    name: name,
    url: url,
  };
  return getPosts()
    .insertOne(post)
    .then(data => mapOptionalPost({ ...post, _id: data.insertedId }));
}

export async function update(id, text) {
  return getPosts()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: { text: text },
      },
      { returnDocument: 'after' }
    )
    .then(data => mapOptionalPost(data));
}

export async function remove(id) {
  return getPosts().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalPost(post) {
  return post ? { ...post, id: post._id.toString() } : post;
}

function mapPosts(posts) {
  return posts.map(post => mapOptionalPost(post));
}
