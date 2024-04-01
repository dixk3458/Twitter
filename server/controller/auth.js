import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export async function signup(req, res, next) {
  const { username, password, name, email, url } = req.body;
  // 회원가입은 이미 존재하는 아이디를 중복해서 생성할 수 없다.
  const found = await userRepository.findByUsername(username);

  if (found) {
    // 중복된 유저
    // 409에러 = 서버 데이터 충돌
    return res.status(409).json({ message: `${username} already exists` });
  }

  // 없다면 회원가입을 진행
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    username: username,
    password: hashed,
    name: name,
    email: email,
    url: url,
  });

  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res, next) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);

  //401에러 = 인증 자격이 없다.
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}
