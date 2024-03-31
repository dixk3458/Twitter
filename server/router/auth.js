import express from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const passwordRegExp =
  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage('username should be at least 5 characters'),
  body('password')
    .trim()
    .matches(passwordRegExp)
    .withMessage('password should be between 8 and 16 chars'),
  // .trim()
  // .isLength({ min: 5 })
  // .withMessage('password should be at least 5 characters'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').trim().notEmpty().withMessage('name is missing'),
  body('email').trim().isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .trim()
    .isURL()
    .withMessage('invalid URL')
    .optional({ values: 'falsy' }),
  validate,
];

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);

router.get('/me', isAuth, authController.me);

export default router;
