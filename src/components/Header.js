import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="py-3 bg-dark text-light">
      <div className="container d-flex flex-wrap align-items-center justify-content-between">
        {/* Left: Brand and Search */}
        <div className="d-flex align-items-center">
          <Link to="/" className="text-light text-decoration-none fs-4 fw-bold me-3">
            Holidaze
          </Link>
          <form onSubmit={handleSearchSubmit} className="d-flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control me-2"
              placeholder="Search venues..."
              style={{ minWidth: "250px" }}
            />
            <button type="submit" className="btn btn-outline-light">
              Search
            </button>
          </form>
        </div>
        {/* Right: Navigation Links */}
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-light">
              Home
            </Link>
          </li>
          {token ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-link px-2 text-light">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="nav-link btn btn-link text-light px-2"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link px-2 text-light">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link px-2 text-light">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;