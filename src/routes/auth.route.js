import express from 'express';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', (req, res) => {
    // Nothing to invalidate on server in stateless JWT
    return res.status(200).json({ message: "Logged out successfully" });
  });
export default router;
