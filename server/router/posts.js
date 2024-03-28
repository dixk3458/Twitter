import express from 'express';

// GET /posts
// GET /posts?username=username
// GET / posts/:id
// POST /posts
// PUT /posts/:id
// DELETE /posts/:id

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

const router = express.Router();

router.get('/', (req, res, next) => {
  // 쿼리를 판단?
  const username = req.query.username;
  const data = username
    ? posts.filter(post => post.username === username)
    : posts;

  // JSON 데이터를 반환한다.
  res.status(200).json(data);
});

router.get('/:id', (req, res, next) => {
  // 해당 포스트 아이디를 가져온다.
  const id = req.params.id;

  // 만약 해당 id에 해당하는 post가 없다면 not found해야함

  const post = posts.find(post => post.id === id);

  if (post) {
    res.status(200).send(post);
    return;
  } else {
    res.status(404).json({ message: `Post id(${id}) not found` });
  }
});

router.post('/', (req, res, next) => {
  // body에 대한 정보를 받아와야한다.
  // 유효성 검사?

  const { text, username, name } = req.body;

  if (!text || !username || !name) {
    // 한개라도 없다면 Bad Request
    res.status(400).json({
      message: `Bad Request - {text : ${text}, username : ${username}, name : ${name}}`,
    });
    return;
  }

  const newPost = {
    id: Date.now().toString(),
    text: text,
    createdAt: new Date(),
    name: name,
    username: username,
  };

  posts = [newPost, ...posts];

  res.status(201).json(newPost);
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  const text = req.body.text;
  const post = posts.find(post => post.id === id);

  if (post) {
    post.text = text;
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `Post id(${id}) not found` });
  }
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  posts = posts.filter(post => post.id !== id);
  res.sendStatus(204);
});

export default router;
