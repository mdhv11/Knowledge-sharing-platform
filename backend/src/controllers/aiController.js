import { improveArticle, generateSummary, suggestTags } from '../services/aiService.js';

export const improveWithAI = async (req, res, next) => {
  try {
    const { title = '', content = '' } = req.body;
    if (!content.trim()) return res.status(400).json({ message: 'Content is required' });

    const result = await improveArticle({ title, content });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const summarizeWithAI = async (req, res, next) => {
  try {
    const { content = '' } = req.body;
    if (!content.trim()) return res.status(400).json({ message: 'Content is required' });

    const summary = await generateSummary(content);
    res.json({ summary });
  } catch (error) {
    next(error);
  }
};

export const suggestTagsWithAI = async (req, res, next) => {
  try {
    const { content = '' } = req.body;
    if (!content.trim()) return res.status(400).json({ message: 'Content is required' });

    const tags = await suggestTags(content);
    res.json({ tags });
  } catch (error) {
    next(error);
  }
};
