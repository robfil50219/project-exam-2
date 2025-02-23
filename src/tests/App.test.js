import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders Home page for route "/"', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  // Adjust the text matcher to something that is present on your Home page.
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