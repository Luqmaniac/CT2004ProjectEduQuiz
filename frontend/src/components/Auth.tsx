import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { User } from '../types';
import './Auth.css';

const avatars = ['🦸‍♂️', '🧙‍♀️', '🦁', '🐼', '🦊', '🦄'];

interface AuthProps {
  onLogin: (user: User) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🦸‍♂️');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      toast.error('Oops! Don\'t forget to tell us your name! 😊');
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      username,
      isCreator: true,
      avatar: selectedAvatar
    };

    onLogin(user);
    toast.success(`🌟 Amazing! Welcome to the Learning Adventure, Educator ${username}! 🎉`);
  };

  return (
    <div className="auth-container bounce-in">
      <h1>Welcome to EduQuiz! 🎓</h1>
      <p className="subtitle">Ready for an awesome learning journey? 🚀</p>
      
      <div className="avatar-selector">
        <p>Choose your teacher avatar!</p>
        <div className="avatar-grid">
          {avatars.map((avatar) => (
            <button 
              key={avatar}
              className={`avatar-button ${selectedAvatar === avatar ? 'selected' : ''}`}
              onClick={() => setSelectedAvatar(avatar)}
            >
              {avatar}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name! ✨"
          className="fun-input"
        />
        <button type="submit" className="magic-button">
          <LogIn className="icon" />
          Start Teaching Magic!
        </button>
      </form>
    </div>
  );
}