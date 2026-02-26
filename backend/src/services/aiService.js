import OpenAI from 'openai';

const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const fallbackSummary = (content) => {
  const plain = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.slice(0, 160) + (plain.length > 160 ? '...' : '');
};

export const improveArticle = async ({ title, content }) => {
  if (!openai) {
    return {
      improvedTitle: title,
      improvedContent: content,
      note: 'OpenAI key missing, fallback response returned.'
    };
  }

  const prompt = `You are an expert technical editor. Improve the article title and content for clarity, grammar, and conciseness while preserving meaning. Return strict JSON with keys improvedTitle and improvedContent.\\n\\nTitle: ${title}\\n\\nContent: ${content}`;
  const response = await openai.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.4,
    response_format: { type: 'json_object' }
  });

  const raw = response.choices?.[0]?.message?.content || '{}';
  let parsed = {};
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = {};
  }

  return {
    improvedTitle: parsed.improvedTitle || title,
    improvedContent: parsed.improvedContent || content
  };
};

export const generateSummary = async (content) => {
  if (!openai) return fallbackSummary(content);

  const prompt = `Create a short 1-2 sentence summary for this technical article. Max 220 characters.\\n\\n${content}`;
  const response = await openai.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3
  });

  return (response.choices?.[0]?.message?.content || fallbackSummary(content)).trim();
};

export const suggestTags = async (content) => {
  if (!openai) return [];

  const prompt = `Suggest up to 6 concise technical tags for this content. Return strict JSON with key tags as string array.\\n\\n${content}`;
  const response = await openai.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
    response_format: { type: 'json_object' }
  });

  const raw = response.choices?.[0]?.message?.content || '{}';
  let parsed = {};
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = {};
  }
  return Array.isArray(parsed.tags) ? parsed.tags.slice(0, 6) : [];
};
