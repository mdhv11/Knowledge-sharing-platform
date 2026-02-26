import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className="nav-inner container">
        <Link to="/" className="brand">KnowledgeShare</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {isAuthenticated && <Link to="/articles/new">New Article</Link>}
          {isAuthenticated && <Link to="/dashboard">My Articles</Link>}
          {!isAuthenticated && <Link to="/login">Login</Link>}
          {!isAuthenticated && <Link to="/signup">Signup</Link>}
          {isAuthenticated && <button onClick={onLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
