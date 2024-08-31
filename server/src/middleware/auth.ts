
import { Request, Response, NextFunction } from 'express';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const adminToken = req.headers['admin-token'];
  
  if (adminToken === process.env.ADMIN_TOKEN) {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};