import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <article className="card">
      <h3><Link to={`/articles/${article.id}`}>{article.title}</Link></h3>
      <p>{article.summary || 'No summary available.'}</p>
      <div className="meta">
        <span>{article.category}</span>
        <span>{article.author_name}</span>
        <span>{new Date(article.created_at).toLocaleDateString()}</span>
      </div>
      {article.tags && <small>Tags: {article.tags}</small>}
    </article>
  );
};

export default ArticleCard;
