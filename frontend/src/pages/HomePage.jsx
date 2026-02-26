import { useEffect, useState } from 'react';
import { listArticlesApi } from '../api/articleApi';
import ArticleCard from '../components/ArticleCard';

const categories = ['', 'Tech', 'AI', 'Backend', 'Frontend', 'DevOps'];

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await listArticlesApi({ q, category });
      setArticles(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container page">
      <h1>Explore Articles</h1>
      <div className="filters">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title, content, tags"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => (
            <option key={item || 'all'} value={item}>
              {item || 'All categories'}
            </option>
          ))}
        </select>
        <button onClick={fetchData}>Apply</button>
      </div>
      {loading && <p>Loading...</p>}
      <div className="grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {!loading && articles.length === 0 && <p>No articles found.</p>}
    </div>
  );
};

export default HomePage;
