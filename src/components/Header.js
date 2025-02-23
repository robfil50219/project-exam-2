import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');
  const avatarUrl = localStorage.getItem('avatarUrl'); // Ensure this is set after login/profile fetch
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('avatarUrl');
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container-fluid d-flex align-items-center">
        {/* Left: Logo and Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img 
            src={process.env.PUBLIC_URL + '/logoBlue.png'} 
            alt="Logo" 
            style={{ height: '40px', marginRight: '10px' }}
          />
          <span className="fs-4 fw-bold">Holidaze</span>
        </Link>

        {/* Mobile: Hamburger Toggle */}
        <button 
          className="navbar-toggler ms-auto" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Center: Search Bar */}
          <div className="d-flex flex-grow-1 justify-content-center">
            <form onSubmit={handleSearchSubmit} className="d-flex" style={{ maxWidth: '500px', width: '100%' }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="form-control me-2"
                placeholder="Search venues..."
              />
              <button type="submit" className="btn btn-outline-light">Search</button>
            </form>
          </div>

          {/* Right: Navigation Links */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn nav-link btn-link" onClick={handleLogout}>Logout</button>
                </li>
                {/* On desktop, show the profile image to the right */}
                {avatarUrl && (
                  <li className="nav-item ms-2 d-none d-lg-block">
                    <img 
                      src={avatarUrl} 
                      alt="Profile" 
                      className="rounded-circle" 
                      style={{ height: '40px', width: '40px', objectFit: 'cover' }}
                    />
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
            {/* On mobile, show the profile image at the far right */}
            {token && avatarUrl && (
              <li className="nav-item d-lg-none">
                <img 
                  src={avatarUrl} 
                  alt="Profile" 
                  className="rounded-circle ms-2"
                  style={{ height: '40px', width: '40px', objectFit: 'cover' }}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;