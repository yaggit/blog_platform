import express from 'express';
import cors from 'cors';
import routes from './routes/blogRoutes';
import sequelize from './utils/db';
import { QuestionService } from './services/questionService';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize.sync().then(() => {
  console.log('Database synced');

  QuestionService.initScheduler();
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});