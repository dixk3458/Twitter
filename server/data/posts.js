let posts = [
  {
    id: '1',
    text: '정재웅 포스트',
    createdAt: Date.now().toString(),
    name: 'Jaewoong',
    username: 'jaewoong3458',
    url: 'https://images.unsplash.com/photo-1618695537407-d2a1a57ecc9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8SnI2ZkFNdGZjaVV8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    text: '남도형 포스트',
    createdAt: Date.now().toString(),
    name: 'Dohyeong',
    username: 'dohyeong3458',
    url: 'https://images.unsplash.com/photo-1618695537407-d2a1a57ecc9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8SnI2ZkFNdGZjaVV8fGVufDB8fHx8fA%3D%3D',
  },
];

export async function getAllByUsername(username) {
  return posts.filter(post => post.username === username);
}

export async function getAll() {
  return posts;
}

export async function get(id) {
  return posts.find(post => post.id === id);
}

export async function create(text, username, name) {
  const newPost = {
    id: Date.now().toString(),
    text: text,
    createdAt: new Date(),
    name: name,
    username: username,
  };

  posts = [newPost, ...posts];

  return newPost;
}

export async function update(id, text) {
  const post = posts.find(post => post.id === id);
  if (post) {
    post.text = text;
  }

  return post;
}

export async function remove(id) {
  posts = posts.filter(post => post.id !== id);
}
