import express from 'express';
import * as postsController from '../controller/posts.js';

// GET /posts
// GET /posts?username=username
// GET / posts/:id
// POST /posts
// PUT /posts/:id
// DELETE /posts/:id

const router = express.Router();

router.get('/', postsController.getPosts);

router.get('/:id', postsController.getPost);

router.post('/', postsController.createPost);

router.put('/:id', postsController.updatePost);

router.delete('/:id', postsController.removePost);

export default router;
