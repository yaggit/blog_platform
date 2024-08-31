import express from 'express';
import * as blogController from '../controllers/blogController';
import * as questionController from '../controllers/questionController';
import { adminAuth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/question', questionController.getCurrentQuestion);
router.get('/posts', blogController.getAllPosts);
router.get('/posts/:id', blogController.getPostById);
router.post('/posts', blogController.createPost);

// Admin routes
router.post('/question', adminAuth, questionController.setNewQuestion);
router.delete('/posts', adminAuth, blogController.clearAllPosts);

export default router;