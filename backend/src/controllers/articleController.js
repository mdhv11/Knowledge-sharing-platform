import { pool } from '../config/db.js';
import { generateSummary } from '../services/aiService.js';

const parseTags = (tags = '') =>
  String(tags)
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .join(',');

export const createArticle = async (req, res, next) => {
  try {
    const { title, category, content, tags = '' } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ message: 'title, category and content are required' });
    }

    const summary = await generateSummary(content);
    const [result] = await pool.query(
      `INSERT INTO articles (title, category, content, tags, summary, author_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, category, content, parseTags(tags), summary, req.user.id]
    );

    return res.status(201).json({
      message: 'Article created',
      articleId: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

export const listArticles = async (req, res, next) => {
  try {
    const { q = '', category = '' } = req.query;

    const conditions = [];
    const params = [];

    if (q.trim()) {
      conditions.push('(a.title LIKE ? OR a.content LIKE ? OR a.tags LIKE ?)');
      const likeValue = `%${q.trim()}%`;
      params.push(likeValue, likeValue, likeValue);
    }

    if (category.trim()) {
      conditions.push('a.category = ?');
      params.push(category.trim());
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const [rows] = await pool.query(
      `SELECT a.id, a.title, a.category, a.tags, a.summary, a.created_at, a.updated_at,
              u.id AS author_id, u.username AS author_name
       FROM articles a
       JOIN users u ON u.id = a.author_id
       ${whereClause}
       ORDER BY a.created_at DESC`,
      params
    );

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT a.id, a.title, a.category, a.content, a.tags, a.summary, a.created_at, a.updated_at,
              u.id AS author_id, u.username AS author_name, u.email AS author_email
       FROM articles a
       JOIN users u ON u.id = a.author_id
       WHERE a.id = ?`,
      [id]
    );

    if (!rows.length) return res.status(404).json({ message: 'Article not found' });
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const listMyArticles = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, category, tags, summary, created_at, updated_at
       FROM articles
       WHERE author_id = ?
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, category, content, tags = '' } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ message: 'title, category and content are required' });
    }

    const [rows] = await pool.query('SELECT author_id FROM articles WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Article not found' });
    if (rows[0].author_id !== req.user.id) {
      return res.status(403).json({ message: 'You can edit only your own articles' });
    }

    const summary = await generateSummary(content);
    await pool.query(
      `UPDATE articles
       SET title = ?, category = ?, content = ?, tags = ?, summary = ?
       WHERE id = ?`,
      [title, category, content, parseTags(tags), summary, id]
    );

    res.json({ message: 'Article updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT author_id FROM articles WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Article not found' });
    if (rows[0].author_id !== req.user.id) {
      return res.status(403).json({ message: 'You can delete only your own articles' });
    }

    await pool.query('DELETE FROM articles WHERE id = ?', [id]);
    res.json({ message: 'Article deleted' });
  } catch (error) {
    next(error);
  }
};
