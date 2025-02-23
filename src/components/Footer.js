import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5" style={{ borderTop: '4px solid #444' }}>
      <div className="container-fluid">
        <div className="row">
          {/* For medium and larger screens */}
          <div className="d-none d-md-flex col-md-6 justify-content-start align-items-center">
            <Link 
              to="/about" 
              className="me-3 text-decoration-none text-light fw-bold" 
              style={{ fontSize: '1.2rem' }}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-decoration-none text-light fw-bold" 
              style={{ fontSize: '1.2rem' }}
            >
              Contact
            </Link>
          </div>
          <div className="d-none d-md-flex col-md-6 justify-content-end align-items-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} <span className="fw-bold">Holidaze</span>. All rights reserved.
            </p>
          </div>
          {/* For small screens */}
          <div className="d-flex d-md-none flex-column col-12 text-center">
            <div>
              <Link 
                to="/about" 
                className="me-3 text-decoration-none text-light fw-bold" 
                style={{ fontSize: '1.2rem' }}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-decoration-none text-light fw-bold" 
                style={{ fontSize: '1.2rem' }}
              >
                Contact
              </Link>
            </div>
            <p className="mb-0 mt-2">
              &copy; {new Date().getFullYear()} <span className="fw-bold">Holidaze</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;