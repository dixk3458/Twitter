import express from 'express';
import { body } from 'express-validator';
import * as postsController from '../controller/posts.js';
import validate from '../middleware/validator.js';

// GET /posts
// GET /posts?username=username
// GET / posts/:id
// POST /posts
// PUT /posts/:id
// DELETE /posts/:id

const router = express.Router();

const validatePost = [
  body('text')
    .trim()
    .isLength({ min: 5 })
    .withMessage('text shoud be at least 5 characters'),
  validate,
];

router.get('/', postsController.getPosts);

router.get('/:id', postsController.getPost);

router.post('/', validatePost, postsController.createPost);

router.put('/:id', validatePost, postsController.updatePost);

router.delete('/:id', postsController.removePost);

export default router;
