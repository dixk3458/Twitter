import { getSocketIO } from '../connection/socket.js';
import * as postsRepository from '../data/posts.js';

export async function getPosts(req, res, next) {
  // 쿼리를 판단?
  const username = req.query.username;
  const data = await (username
    ? postsRepository.getAllByUsername(username)
    : postsRepository.getAll());

  // JSON 데이터를 반환한다.
  res.status(200).json(data);
}

export async function getPost(req, res, next) {
  // 해당 포스트 아이디를 가져온다.
  const id = req.params.id;

  // 만약 해당 id에 해당하는 post가 없다면 not found해야함

  const post = await postsRepository.getById(id);

  if (post) {
    res.status(200).send(post);
    return;
  } else {
    res.status(404).json({ message: `Post id(${id}) not found` });
  }
}

export async function createPost(req, res, next) {
  // body에 대한 정보를 받아와야한다.
  // 유효성 검사?

  const { text } = req.body;

  const newPost = await postsRepository.create(text, req.userId);

  res.status(201).json(newPost);

  getSocketIO().emit('posts', newPost);
}

export async function updatePost(req, res, next) {
  const id = req.params.id;

  const text = req.body.text;

  const post = await postsRepository.getById(id);

  if (!post) {
    return res.sendStatus(404);
  }

  if (post.userid !== req.userId) {
    return res.sendStatus(403);
  }

  const updated = await postsRepository.update(id, text);

  if (updated) {
    res.status(200).json(updated);
  } else {
    res.status(404).json({ message: `Post id(${id}) not found` });
  }
}

export async function removePost(req, res, next) {
  const id = req.params.id;

  const post = await postsRepository.getById(id);

  if (!post) {
    return res.sendStatus(404);
  }

  if (post.userid !== req.userId) {
    return res.sendStatus(403);
  }

  await postsRepository.remove(id);
  res.sendStatus(204);
}
