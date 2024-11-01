import express from 'express';
import QuizController from '../controllers/QuizController.js';
import auth from '../middleware/auth.js';

const router = express.Router();
const quizController = new QuizController();

router.post('/', auth.authenticate, auth.isEducator, (req, res) => quizController.create(req, res));
router.get('/', (req, res) => quizController.getAll(req, res));
router.get('/:id', (req, res) => quizController.getById(req, res));
router.put('/:id', auth.authenticate, auth.isEducator, (req, res) => quizController.update(req, res));
router.delete('/:id', auth.authenticate, auth.isEducator, (req, res) => quizController.delete(req, res));

export default router;