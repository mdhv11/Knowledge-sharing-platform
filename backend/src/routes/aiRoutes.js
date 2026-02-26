import { Router } from 'express';
import { improveWithAI, suggestTagsWithAI, summarizeWithAI } from '../controllers/aiController.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.post('/improve', authRequired, improveWithAI);
router.post('/summary', authRequired, summarizeWithAI);
router.post('/tags', authRequired, suggestTagsWithAI);

export default router;
