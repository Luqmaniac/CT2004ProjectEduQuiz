import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class UserController {
  async register(req, res) {
    try {
      const { username, password, isEducator } = req.body;

      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({
        username,
        password,
        isEducator
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id, isEducator: user.isEducator },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({ token, user: { id: user._id, username, isEducator } });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id, isEducator: user.isEducator },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token, user: { id: user._id, username, isEducator: user.isEducator } });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}