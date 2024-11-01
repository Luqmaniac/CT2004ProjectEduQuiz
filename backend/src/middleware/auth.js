import jwt from 'jsonwebtoken';

class AuthMiddleware {
  authenticate(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  }

  isEducator(req, res, next) {
    if (!req.user.isEducator) {
      return res.status(403).json({ message: 'Access denied. Educators only.' });
    }
    next();
  }
}

export default new AuthMiddleware();