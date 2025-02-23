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
      <div className="container d-flex align-items-center">
        {/* Left: Logo and Brand */}
        <div className="d-flex align-items-center flex-shrink-0">
          <Link to="/" className="d-flex align-items-center text-light text-decoration-none me-3">
            <img 
              src={process.env.PUBLIC_URL + '/logoBlue.png'} 
              alt="Logo" 
              style={{ height: '40px', marginRight: '10px' }}
            />
            <span className="fs-4 fw-bold">Holidaze</span>
          </Link>
        </div>
        
        {/* Center: Search Bar */}
        <div className="flex-grow-1 text-center">
          <form onSubmit={handleSearchSubmit} className="d-inline-flex w-100 justify-content-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control me-2"
              placeholder="Search venues..."
              style={{ minWidth: "250px", maxWidth: "400px" }}
            />
            <button type="submit" className="btn btn-outline-light">
              Search
            </button>
          </form>
        </div>
        
        {/* Right: Navigation Links */}
        <div className="d-flex align-items-center flex-shrink-0">
          <ul className="nav mb-0">
            <li className="nav-item">
              <Link className="nav-link px-2 text-light" to="/">Home</Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-2 text-light" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn nav-link btn-link text-light px-2" onClick={handleLogout}>
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
      </div>
    </header>
  );
};

export default Header;