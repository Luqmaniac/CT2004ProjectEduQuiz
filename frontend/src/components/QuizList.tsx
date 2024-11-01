import React, { useState } from 'react';
import QuizPlayer from './QuizPlayer';
import type { Quiz, User } from '../types';
import './QuizList.css';

interface QuizListProps {
  quizzes: Quiz[];
  onDelete: (id: string) => void;
  user: User | null;
}

export default function QuizList({ quizzes, onDelete, user }: QuizListProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleQuizComplete = (score: number) => {
    console.log(`Quiz completed with score: ${score}`);
    setSelectedQuiz(null); // Navigate back to quiz list
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null); // Navigate back to quiz list
  };

  const displayQuizzes = user?.isCreator
    ? quizzes.filter(quiz => quiz.createdBy === user.id)
    : quizzes;

  if (selectedQuiz) {
    return (
      <QuizPlayer 
        quiz={selectedQuiz} 
        onComplete={handleQuizComplete} 
        onBack={handleBackToQuizzes} 
      />
    );
  }

  return (
    <div className="quiz-list container">
      {!user && (
        <div className="welcome-section bounce-in">
          <h1 className="welcome-title">🌟 Welcome, Young Explorer! 🌟</h1>
          <p className="welcome-subtitle">Ready for an amazing learning adventure? Pick a quiz below! 🚀</p>
          <div className="mascot">🦊</div>
        </div>
      )}

      <h2 className="section-title bounce-in">
        {user?.isCreator 
          ? '✨ Your Magical Quiz Collection ✨' 
          : '🎯 Choose Your Learning Adventure! 🎯'}
      </h2>
      
      {displayQuizzes.length === 0 ? (
        <div className="empty-state bounce-in">
          <div className="empty-mascot">🦄</div>
          <p className="empty-message">
            {user?.isCreator
              ? "Let's create some awesome quizzes together! Click the 'Create Quiz' button to start! 🎨"
              : "We're preparing some super fun quizzes for you! Come back soon! 🌈"}
          </p>
          <div className="empty-animation">✨</div>
        </div>
      ) : (
        <div className="quiz-grid">
          {displayQuizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card fade-in">
              <div className="quiz-content">
                <h3 className="quiz-title">{quiz.title}</h3>
                <div className="quiz-info">
                  <span className="question-count">
                    {quiz.questions.length} Questions 📝
                  </span>
                </div>
              </div>
              
              <div className="quiz-actions">
                <button 
                  onClick={() => handleQuizSelect(quiz)}
                  className="start-button"
                >
                  Start Adventure!
                </button>
                
                {user?.isCreator && (
                  <button 
                    onClick={() => onDelete(quiz.id)}
                    className="delete-button"
                  >
                    Remove Quiz
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}