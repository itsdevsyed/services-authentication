import jwt from 'jsonwebtoken';
import redis from '../config/redis.js';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
  let token;

  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token missing',
      });
    }

    // Check if token is blacklisted
    const isBlacklisted = await redis.get(`bl_${token}`);
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: 'Token has been logged out (blacklisted)',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, user not found',
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Auth Error:', error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token invalid or expired',
    });
  }
};
