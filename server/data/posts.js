import * as userRepository from '../data/auth.js';

let posts = [
  {
    id: '1',
    text: '남도형 포스트 1',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '남도형 포스트 2',
    createdAt: new Date().toString(),
    userId: '1',
  },
];

export async function getAllByUsername(username) {
  return getAll().then(posts =>
    posts.filter(post => post.username === username)
  );
}

export async function getById(id) {
  const found = posts.find(post => post.id === id);
  if (!found) {
    return null;
  }

  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url }; // post에 대한 데이터 + 사용자 정보를 더해서 준다.
}

export async function getAll() {
  return Promise.all(
    posts.map(async post => {
      const { username, name, url } = await userRepository.findById(
        post.userId
      );
      return { ...post, username, name, url };
    })
  );
}

export async function get(id) {
  return posts.find(post => post.id === id);
}

export async function create(text, userId) {
  const post = {
    id: new Date().toString(), // post 고유 id
    text: text,
    createdAt: new Date(),
    userId: userId,
  };

  posts = [post, ...posts];
  return getById(post.id);
}

export async function update(id, text) {
  const post = posts.find(post => post.id === id);
  if (post) {
    post.text = text;
  }

  return getById(post.id);
}

export async function remove(id) {
  posts = posts.filter(post => post.id !== id);
}
