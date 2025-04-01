import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log("Extracted Token:", token); // ADD THIS LINE

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // ADD THIS LINE

      // Get user from token
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }, // Exclude password from the user object
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Not authorized, invalid token",
        });
      }

      req.user = user; // Attach user to request
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error);  // ADD THIS LINE
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};
