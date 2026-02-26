import jwt from 'jsonwebtoken';
import { isTokenRevoked } from './tokenStore.js';

export const authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (isTokenRevoked(token)) {
    return res.status(401).json({ message: 'Token has been invalidated. Please login again.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token = token;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
