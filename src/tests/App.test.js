// src/tests/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App Routing', () => {
  test('renders Home page for route "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Assuming Home component displays "Home" text or similar
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('renders Login page for route "/login"', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('renders Venue Details page for route "/venues/1"', async () => {
    render(
      <MemoryRouter initialEntries={['/venues/1']}>
        <App />
      </MemoryRouter>
    );
    // Since VenueDetails shows a loading message initially
    expect(screen.getByText(/Loading venue details/i)).toBeInTheDocument();
  });
});