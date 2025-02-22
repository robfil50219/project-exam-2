import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to the search page with the query as a URL parameter
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="bg-dark text-light py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-light text-decoration-none">
          <h1 className="h3 m-0">Holidaze</h1>
        </Link>
        <form className="d-flex" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control me-2"
            placeholder="Search venues..."
          />
          <button type="submit" className="btn btn-outline-light">
            Search
          </button>
        </form>
        <nav>
          <Link to="/profile" className="text-light me-3">Profile</Link>
          <Link to="/login" className="text-light me-3">Login</Link>
          <Link to="/register" className="text-light">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

