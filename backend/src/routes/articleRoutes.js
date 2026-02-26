import { Router } from 'express';
import {
  createArticle,
  deleteArticle,
  getArticleById,
  listArticles,
  listMyArticles,
  updateArticle
} from '../controllers/articleController.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.get('/', listArticles);
router.get('/mine/list', authRequired, listMyArticles);
router.get('/:id', getArticleById);
router.post('/', authRequired, createArticle);
router.put('/:id', authRequired, updateArticle);
router.delete('/:id', authRequired, deleteArticle);

export default router;
