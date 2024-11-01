export interface Question {
  id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category?: string;
  difficulty?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: Date;
  createdBy: string;
}

export interface User {
  id: string;
  username: string;
  isCreator: boolean;
  avatar: string; // Added avatar property
}