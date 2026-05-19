import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/players">Find Players</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/friends">Friends</Link>
      </div>

      <div className="user-menu">
        <button
          type="button"
          className="user-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {user?.name || 'User'} ▾
        </button>

        {menuOpen && (
          <div className="user-dropdown">
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>

            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
} 