import { Request, Response } from 'express';
import { BlogService } from '../services/blogService';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await BlogService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const post = await BlogService.getPostById(id);
    res.json(post);
  } catch (error:any) {
    if (error.message === 'Post not found') {
      res.status(404).json({ message: 'Post not found' });
    } else {
      res.status(500).json({ message: 'Error fetching post', error });
    }
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const newPost = await BlogService.createPost(content);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

export const clearAllPosts = async (req: Request, res: Response) => {
  try {
    await BlogService.clearAllPosts();
    res.json({ message: 'All posts cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing posts', error });
  }
};
