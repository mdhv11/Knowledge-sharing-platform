import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteArticleApi, listMyArticlesApi } from '../api/articleApi';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  const load = async () => {
    const { data } = await listMyArticlesApi();
    setArticles(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    await deleteArticleApi(id);
    await load();
  };

  return (
    <div className="container page">
      <h1>My Articles</h1>
      {articles.length === 0 && <p>No articles yet.</p>}
      <div className="grid">
        {articles.map((article) => (
          <article className="card" key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <div className="meta">
              <span>{article.category}</span>
              <span>{new Date(article.created_at).toLocaleDateString()}</span>
            </div>
            <div className="toolbar">
              <button onClick={() => navigate(`/articles/${article.id}/edit`)}>Edit</button>
              <button onClick={() => onDelete(article.id)}>Delete</button>
              <Link to={`/articles/${article.id}`}>View</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
