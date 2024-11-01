import React, { useState } from 'react';
import { Download, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { Question } from '../types';
import './TriviaFetcher.css';

interface TriviaFetcherProps {
  onFetch: (questions: Question[]) => void;
}

export default function TriviaFetcher({ onFetch }: TriviaFetcherProps) {
  const [amount, setAmount] = useState('5');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: '9', name: 'Fun Facts 🌟', emoji: '🎯' },
    { id: '17', name: 'Nature & Animals 🦁', emoji: '🌿' },
    { id: '18', name: 'Computer Fun 💻', emoji: '🤖' },
    { id: '19', name: 'Math Magic 🔢', emoji: '✨' },
    { id: '22', name: 'World Explorer 🗺️', emoji: '🌎' },
    { id: '23', name: 'Time Travel ⏰', emoji: '🏰' }
  ];

  const difficulties = [
    { value: 'easy', label: 'Beginner 😊', color: '#4ade80' },
    { value: 'medium', label: 'Explorer 🚀', color: '#fbbf24' },
    { value: 'hard', label: 'Champion 🏆', color: '#f87171' }
  ];

  const handleFetch = async () => {
    if (!category || !difficulty) {
      toast.error("Don't forget to pick a topic and how tricky you want it! 🎯");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();

      if (data.response_code === 0) {
        const formattedQuestions: Question[] = data.results.map((q: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          question: q.question,
          correct_answer: q.correct_answer,
          incorrect_answers: q.incorrect_answers,
          category: q.category,
          difficulty: q.difficulty
        }));

        onFetch(formattedQuestions);
        toast.success("🎉 Woohoo! Your quiz is ready! Let's play!");
      } else {
        throw new Error("Couldn't find enough questions");
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Let's try again! 🔄");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trivia-fetcher-container">
      <h2 className="fetcher-title">🎮 Create Your Quiz Adventure!</h2>
      
      <div className="fetcher-controls">
        <div className="control-group">
          <label>How many questions would you like? 🤔</label>
          <div className="slider-container">
            <input 
              type="range"
              min="1"
              max="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="question-slider"
            />
            <span className="question-amount">{amount} Questions</span>
          </div>
        </div>

        <div className="control-group">
          <label>Pick your favorite topic! ⭐</label>
          <div className="category-grid">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id);
                  setSelectedCategory(cat.id);
                }}
                className={`category-button ${selectedCategory === cat.id ? 'selected' : ''}`}
              >
                <span className="category-emoji">{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>How tricky do you want it? 💪</label>
          <div className="difficulty-buttons">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => setDifficulty(diff.value)}
                className={`difficulty-button ${difficulty === diff.value ? 'selected' : ''}`}
                style={{ '--button-color': diff.color } as React.CSSProperties}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleFetch}
          className="start-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="spin" />
              <span>Creating your quiz...</span>
            </>
          ) : (
            <>
              <Download className="icon" />
              <span>Start Your Adventure! 🚀</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}