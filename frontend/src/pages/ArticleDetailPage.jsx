import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticleApi } from '../api/articleApi';
import { useAuth } from '../context/AuthContext';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await getArticleApi(id);
      setArticle(data);
    };
    load();
  }, [id]);

  if (!article) return <div className="container page"><p>Loading...</p></div>;

  return (
    <div className="container page">
      <h1>{article.title}</h1>
      <div className="meta">
        <span>{article.category}</span>
        <span>By {article.author_name}</span>
        <span>Created: {new Date(article.created_at).toLocaleString()}</span>
        <span>Updated: {new Date(article.updated_at).toLocaleString()}</span>
      </div>
      <p><strong>Tags:</strong> {article.tags || '-'}</p>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      {user?.id === article.author_id && (
        <p><Link to={`/articles/${article.id}/edit`}>Edit this article</Link></p>
      )}
    </div>
  );
};

export default ArticleDetailPage;
