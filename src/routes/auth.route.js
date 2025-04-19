import express from 'express';
import { login } from '../controllers/auth/login.js';
import { register } from '../controllers/auth/register.js';
import { profile } from '../controllers/auth/profile.js';
import { protect } from '../middleware/auth.middleware.js';
import { logout } from '../controllers/auth/logout.js';
import { refreshAccessToken } from '../controllers/auth/refresh.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);                    // 👈 Just login
router.post('/refresh', refreshAccessToken);     // 👈 New route for refresh
router.get('/profile', protect, profile);
router.post('/logout', protect, logout);

export default router;
