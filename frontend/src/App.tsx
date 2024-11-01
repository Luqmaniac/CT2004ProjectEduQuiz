import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Auth from './components/Auth';
import Header from './components/Header';
import QuizCreator from './components/QuizCreator';
import TriviaFetcher from './components/TriviaFetcher';
import QuizList from './components/QuizList';
import QuizPlayer from './components/QuizPlayer';
import type { Quiz, Question, User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'list' | 'create' | 'fetch'>('list');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  const handleLogin = (user: User) => {
    setUser(user);
    setView('list');
  };

  const handleLogout = () => {
    setUser(null);
    setView('list');
    setActiveQuiz(null);
  };

  const handleSaveQuiz = (title: string, questions: Question[]) => {
    if (!user?.isCreator) return;

    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title,
      questions,
      createdAt: new Date(),
      createdBy: user.id,
    };
    setQuizzes([...quizzes, newQuiz]);
    setView('list');
  };

  const handleFetchQuestions = (questions: Question[]) => {
    if (!user?.isCreator) return;

    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: `Trivia Quiz #${quizzes.length + 1}`,
      questions,
      createdAt: new Date(),
      createdBy: user.id,
    };
    setQuizzes([...quizzes, newQuiz]);
    setView('list');
  };

  const handleDeleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== id));
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
  };

  if (activeQuiz) {
    return (
      <div className="app">
        <QuizPlayer quiz={activeQuiz} onExit={() => setActiveQuiz(null)} />
      </div>
    );
  }

  return (
    <div className="app">
      <Toaster position="top-center" />
      <Header
        view={view}
        setView={setView}
        user={user}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {view === 'list' && (
          <QuizList
            quizzes={quizzes}
            onDelete={handleDeleteQuiz}
            onStart={handleStartQuiz}
            user={user}
          />
        )}
        {view === 'create' && !user && (
          <Auth onLogin={handleLogin} />
        )}
        {view === 'create' && user?.isCreator && (
          <QuizCreator onSave={handleSaveQuiz} />
        )}
        {view === 'fetch' && user?.isCreator && (
          <TriviaFetcher onFetch={handleFetchQuestions} />
        )}
      </main>
    </div>
  );
}