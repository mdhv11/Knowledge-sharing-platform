import { Router } from 'express';
import { login, logout, signup } from '../controllers/authController.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authRequired, logout);

export default router;
