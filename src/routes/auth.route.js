import express from 'express';
import { login } from '../controllers/auth/login.js';
import { logout } from '../controllers/auth/logout.js';
import { profile } from '../controllers/auth/profile.js';
import { refreshAccessToken } from '../controllers/auth/refresh.js';
import { register } from '../controllers/auth/register.js';
import { protect } from '../middleware/auth.middleware.js';
import { verifyEmail } from '../controllers/auth/verifyEmail.js';
import { resendOtp } from '../controllers/auth/resendOtp.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);                    // 👈 Just login
router.post('/refresh', refreshAccessToken);     // 👈 New route for refresh
router.get('/profile', protect, profile);
router.post('/logout', logout); // no protec
router.post('/verify-email', verifyEmail); // Verify Email Route
router.post('/resend-otp', resendOtp);
// email verification

export default router;
