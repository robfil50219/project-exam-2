import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';

describe('Header Component', () => {
  test('renders brand name and navigation links for guest', () => {
    // Clear any token to simulate a guest user.
    localStorage.removeItem('token');
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText(/Holidaze/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test('renders profile and logout when logged in', () => {
    // Set a dummy token to simulate a logged-in user.
    localStorage.setItem('token', 'dummy-token');
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });
});

