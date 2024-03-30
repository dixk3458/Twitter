import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization'); // 헤더에 있는 Authorization 키를 확인해줌
  if (!(authHeader && authHeader.startWith('Bearer'))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    'c^MQU9E^vPhpF2#u67G@g4%tafZfd5RI',
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await userRepository.findByUserId(decoded.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      req.userId = user.id; // 앞으로의 요청에서 계속 사용해야하기때문에 커스텀 데이터 등록
      next();
    }
  );
};
