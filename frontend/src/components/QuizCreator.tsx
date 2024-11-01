import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import type { Question } from '../types';

interface QuizCreatorProps {
  onSave: (title: string, questions: Question[]) => void;
}

export default function QuizCreator({ onSave }: QuizCreatorProps) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState(['', '', '']);

  const handleAddQuestion = () => {
    if (!currentQuestion || !correctAnswer || incorrectAnswers.some(answer => !answer)) {
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      question: currentQuestion,
      correct_answer: correctAnswer,
      incorrect_answers: [...incorrectAnswers],
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setCorrectAnswer('');
    setIncorrectAnswers(['', '', '']);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSaveQuiz = () => {
    if (!title || questions.length === 0) return;
    onSave(title, questions);
  };

  return (
    <div className="quiz-creator">
      <h2 className="section-title">Create New Quiz</h2>

      <div className="form-card">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
          className="form-input"
        />

        <div className="question-form">
          <input
            type="text"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="Question"
            className="form-input"
          />

          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="Correct Answer"
            className="form-input"
          />

          {incorrectAnswers.map((answer, index) => (
            <input
              key={index}
              type="text"
              value={answer}
              onChange={(e) => {
                const newAnswers = [...incorrectAnswers];
                newAnswers[index] = e.target.value;
                setIncorrectAnswers(newAnswers);
              }}
              placeholder={`Incorrect Answer ${index + 1}`}
              className="form-input"
            />
          ))}

          <button onClick={handleAddQuestion} className="btn btn-primary">
            <Plus size={20} />
            Add Question
          </button>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="form-card">
          <h3 className="card-title">Added Questions</h3>
          <div className="question-list">
            {questions.map((q) => (
              <div key={q.id} className="question-item">
                <div className="question-content">
                  <p className="question-text">{q.question}</p>
                  <p className="answer correct">{q.correct_answer}</p>
                  <p className="answer incorrect">{q.incorrect_answers.join(', ')}</p>
                </div>
                <button
                  onClick={() => handleRemoveQuestion(q.id)}
                  className="btn-icon delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSaveQuiz}
        disabled={!title || questions.length === 0}
        className="btn btn-primary save-btn"
      >
        <Save size={20} />
        Save Quiz
      </button>
    </div>
  );
}