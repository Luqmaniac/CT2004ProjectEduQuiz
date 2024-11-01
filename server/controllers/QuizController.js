import Quiz from '../models/Quiz.js';

class QuizController {
  async create(req, res) {
    try {
      const { title, questions } = req.body;
      const quiz = new Quiz({
        title,
        questions,
        createdBy: req.user.userId
      });

      await quiz.save();
      res.status(201).json(quiz);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getAll(req, res) {
    try {
      const quizzes = await Quiz.find()
        .populate('createdBy', 'username')
        .sort('-createdAt');
      res.json(quizzes);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getById(req, res) {
    try {
      const quiz = await Quiz.findById(req.params.id)
        .populate('createdBy', 'username');
      
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      
      res.json(quiz);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async update(req, res) {
    try {
      const { title, questions } = req.body;
      const quiz = await Quiz.findOneAndUpdate(
        { _id: req.params.id, createdBy: req.user.userId },
        { title, questions },
        { new: true }
      );

      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found or unauthorized' });
      }

      res.json(quiz);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async delete(req, res) {
    try {
      const quiz = await Quiz.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user.userId
      });

      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found or unauthorized' });
      }

      res.json({ message: 'Quiz deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}