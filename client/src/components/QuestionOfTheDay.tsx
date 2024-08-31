import React, { useState, useEffect } from 'react';
import { getCurrentQuestion } from '../services/api';

const QuestionOfTheDay: React.FC = () => {
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const fetchedQuestion = await getCurrentQuestion();
        setQuestion(fetchedQuestion.content);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };
    fetchQuestion();
  }, []);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-6 text-center max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Question of the Day</h2>
      <p className="text-xl italic underline">{question}</p>
    </div>
  );
};

export default QuestionOfTheDay;