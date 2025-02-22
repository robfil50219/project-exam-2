// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer 
      className="bg-dark text-light py-4 mt-5" 
      style={{ borderTop: '4px solid #444' }}
    >
      <div className="container text-center">
        <div className="mb-3">
          <Link 
            to="/about" 
            className="mx-3 text-decoration-none text-light fw-bold" 
            style={{ fontSize: '1.2rem' }}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="mx-3 text-decoration-none text-light fw-bold" 
            style={{ fontSize: '1.2rem' }}
          >
            Contact
          </Link>
        </div>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} <span className="fw-bold">Holidaze</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;