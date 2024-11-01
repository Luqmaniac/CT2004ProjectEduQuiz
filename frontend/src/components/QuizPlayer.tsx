import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Star, Loader } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Quiz } from '../types';
import './QuizPlayer.css';

interface QuizPlayerProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
  onBack: () => void; // Add this prop
}

export default function QuizPlayer({ quiz, onComplete, onBack }: QuizPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (quiz && quiz.questions.length > 0) {
      setIsLoading(false);
    }
  }, [quiz]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <Loader className="spin" />
        <p>Loading your quiz adventure...</p>
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="error-screen">
        <p>Oops! We couldn't find your quiz. Let's try again! 🔄</p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="completion-screen">
        <h2>🎉 Amazing Job! 🎉</h2>
        <p className="final-score">You got {score} out of {quiz.questions.length} right!</p>
        <div className="completion-buttons">
          <button onClick={() => onComplete(score)} className="finish-button">
            <Star className="icon" />
            See Your Stars!
          </button>
          <button onClick={onBack} className="back-button">
            <ArrowLeft className="icon" />
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ].sort(() => Math.random() - 0.5);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    
    if (currentQuestionIndex === quiz.questions.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="quiz-player">
      <div className="quiz-progress">
        <div 
          className="progress-bar"
          style={{ 
            width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` 
          }}
        />
        <span className="progress-text">
          Question {currentQuestionIndex + 1} of {quiz.questions.length} 🎯
        </span>
      </div>

      <div className="question-card">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="answers-grid">
          {answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrect = answer === currentQuestion.correct_answer;
            const showCorrect = showFeedback && isCorrect;
            const showIncorrect = showFeedback && isSelected && !isCorrect;
            
            return (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(answer)}
                className={`answer-button ${isSelected ? 'selected' : ''} 
                  ${showCorrect ? 'correct' : ''}
                  ${showIncorrect ? 'incorrect' : ''}`}
                disabled={showFeedback}
              >
                <span className="answer-emoji">
                  {showCorrect ? '✨' : showIncorrect ? '💫' : '🌟'}
                </span>
                {answer}
              </button>
            );
          })}
        </div>

        <div className="quiz-navigation">
          {showFeedback && (
            <div className="feedback-message">
              {selectedAnswer === currentQuestion.correct_answer ? (
                <span className="correct-message">
                  🎉 Amazing job! You got it right! 🌟
                </span>
              ) : (
                <span className="incorrect-message">
                  Keep trying! You're doing great! 💫
                </span>
              )}
            </div>
          )}
          
          <button
            onClick={handleNext}
            disabled={!showFeedback}
            className="nav-button next-button"
          >
            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <>
                Finish Quiz! 🏆
                <Star className="icon" />
              </>
            ) : (
              <>
                Next Question
                <ArrowRight className="icon" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}