import { Request, Response } from 'express';
import { QuestionService } from '../services/questionService';

export const getCurrentQuestion = async (req: Request, res: Response) => {
  try {
    const question = await QuestionService.getCurrentQuestion();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question', error });
  }
};

export const setNewQuestion = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const newQuestion = await QuestionService.setNewQuestion(content);
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Error creating question', error });
  }
};