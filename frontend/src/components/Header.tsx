import React from 'react';
import { GraduationCap, Plus, List, LogOut, LogIn } from 'lucide-react';
import type { User } from '../types';

interface HeaderProps {
  view: string;
  setView: (view: string) => void;
  user: User | null;
  onLogout: () => void;
}

export default function Header({ view, setView, user, onLogout }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="brand">
          <GraduationCap className="brand-icon" size={32} />
          <div>
            <h1>EduQuiz</h1>
            {!user && <p className="subtitle">Interactive Learning Platform</p>}
          </div>
        </div>
        
        <div className="nav-container">
          <nav className="nav">
            <button
              onClick={() => setView('list')}
              className={`btn ${view === 'list' ? 'btn-active' : 'btn-secondary'}`}
            >
              <List size={20} />
              {user?.isCreator ? 'My Quizzes' : 'Available Quizzes'}
            </button>
            
            {user?.isCreator && (
              <>
                <button
                  onClick={() => setView('create')}
                  className={`btn ${view === 'create' ? 'btn-active' : 'btn-secondary'}`}
                >
                  <Plus size={20} />
                  Create Quiz
                </button>
                <button
                  onClick={() => setView('fetch')}
                  className={`btn ${view === 'fetch' ? 'btn-active' : 'btn-secondary'}`}
                >
                  <GraduationCap size={20} />
                  Import Trivia
                </button>
              </>
            )}
          </nav>

          <div className="user-section">
            {user ? (
              <>
                <span className="username">Educator {user.username}</span>
                <button onClick={onLogout} className="btn-icon" title="Logout">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setView('create')}
                className="btn btn-primary"
              >
                <LogIn size={20} />
                Educator Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}