import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-4">
      <div className="container text-center">
        <div className="mb-2">
          <Link 
            className="mx-2 text-light" 
            to="/about" 
            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            About
          </Link>
          <Link 
            className="mx-2 text-light" 
            to="/contact" 
            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            Contact
          </Link>
        </div>
        <p className="mb-0">&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;



