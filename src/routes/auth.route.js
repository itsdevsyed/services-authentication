import express from 'express';
import  {login} from '../controllers/auth/login.js';
import { register } from '../controllers/auth/register.js';
import { profile } from '../controllers/auth/profile.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);
router.post('/logout', (req, res) => {
    // Nothing to invalidate on server in stateless JWT
    return res.status(200).json({ message: "Logged out successfully" });
  });
export default router;
