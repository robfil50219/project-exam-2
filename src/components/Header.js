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
        {/* Left: Logo, Brand and Search */}
        <div className="d-flex align-items-center">
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center text-light text-decoration-none me-3">
            <img 
              src={process.env.PUBLIC_URL + '/logoBlue.png'} 
              alt="Logo" 
              style={{ height: '40px', marginRight: '10px' }}
            />
            <span className="fs-4 fw-bold">Holidaze</span>
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
            <Link className="nav-link px-2 text-light" to="/">Home</Link>
          </li>
          {token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link px-2 text-light" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-light px-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link px-2 text-light" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-2 text-light" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
