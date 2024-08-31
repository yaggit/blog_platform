import Question from '../models/Question';
import sequelize from '../utils/db';
import cron from 'node-cron';
import { Sequelize, QueryTypes } from 'sequelize';

export class QuestionService {
  private static currentQuestion: any = null;

  static async getCurrentQuestion() {
    if (!this.currentQuestion) {
      await this.setDailyQuestion();
    }
    return this.currentQuestion;
  }

  static async setNewQuestion(content: string) {
    return Question.create({ content });
  }

  static async setDailyQuestion() {
    const query = `
      SELECT content FROM questions 
      ORDER BY RANDOM() 
      LIMIT 1
    `;
    
    try {
      const results: any[] = await sequelize.query(query, {
        type: QueryTypes.SELECT
      });
      
      console.log('Query results:', results); // Log the results
      
      if (results.length > 0) {
        this.currentQuestion = results[0];
        console.log('Current question set:', this.currentQuestion); // Log the current question
      } else {
        console.log('No questions found');
      }
    } catch (error) {
      console.error('Error fetching daily question:', error);
    }
  }
  
//This is for consistent question for the day
  private static generateSeed(date: string): number {
    let hash = 0;
    for (let i = 0; i < date.length; i++) {
      const char = date.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  static initScheduler() {
    // Schedule the task to run every day at midnight
    cron.schedule('0 0 * * *', async () => {
      console.log('Setting new daily question');
      await this.setDailyQuestion();
    });

    // Set the initial question
    this.setDailyQuestion();
  }
}