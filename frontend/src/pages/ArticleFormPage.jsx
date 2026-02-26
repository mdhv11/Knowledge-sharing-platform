import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createArticleApi, getArticleApi, updateArticleApi } from '../api/articleApi';
import { improveWithAiApi, suggestTagsAiApi, summarizeWithAiApi } from '../api/aiApi';

const categories = ['Tech', 'AI', 'Backend', 'Frontend', 'DevOps'];

const ArticleFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    category: 'Tech',
    content: '',
    tags: '',
    summaryPreview: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      const { data } = await getArticleApi(id);
      setForm({
        title: data.title,
        category: data.category,
        content: data.content,
        tags: data.tags || '',
        summaryPreview: data.summary || ''
      });
    };
    load();
  }, [id, isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        title: form.title,
        category: form.category,
        content: form.content,
        tags: form.tags
      };
      if (isEdit) {
        await updateArticleApi(id, payload);
        navigate(`/articles/${id}`);
      } else {
        const { data } = await createArticleApi(payload);
        navigate(`/articles/${data.articleId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const improveWithAi = async () => {
    try {
      const { data } = await improveWithAiApi({ title: form.title, content: form.content });
      setForm((prev) => ({ ...prev, title: data.improvedTitle, content: data.improvedContent }));
    } catch (err) {
      setError(err.response?.data?.message || 'AI improve failed');
    }
  };

  const generateSummary = async () => {
    try {
      const { data } = await summarizeWithAiApi({ content: form.content });
      setForm((prev) => ({ ...prev, summaryPreview: data.summary }));
    } catch (err) {
      setError(err.response?.data?.message || 'AI summary failed');
    }
  };

  const suggestTags = async () => {
    try {
      const { data } = await suggestTagsAiApi({ content: form.content });
      if (data.tags?.length) {
        setForm((prev) => ({ ...prev, tags: data.tags.join(', ') }));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'AI tag suggestion failed');
    }
  };

  return (
    <div className="container page">
      <h1>{isEdit ? 'Edit Article' : 'Create Article'}</h1>
      <form className="form" onSubmit={onSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((category) => (
            <option value={category} key={category}>{category}</option>
          ))}
        </select>

        <ReactQuill theme="snow" value={form.content} onChange={(value) => setForm({ ...form, content: value })} />

        <div className="toolbar">
          <button type="button" onClick={improveWithAi}>Improve with AI</button>
          <button type="button" onClick={generateSummary}>Preview Summary</button>
          <button type="button" onClick={suggestTags}>Suggest Tags</button>
        </div>

        <input
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />

        {form.summaryPreview && <p><strong>AI Summary Preview:</strong> {form.summaryPreview}</p>}

        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Article'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ArticleFormPage;
