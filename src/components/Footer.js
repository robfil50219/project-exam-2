import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-4">
      <div className="container text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

