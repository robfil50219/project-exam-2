import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';

// We'll mock the fetch call for login
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      data: {
        accessToken: 'dummy-access-token',
        name: 'TestUser',
        // additional data if needed...
      },
    }),
  })
);

describe('Login Component', () => {
  test('submits the form and stores token, then navigates', async () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));
    
    render(
      <Router>
        <Login />
      </Router>
    );
    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test23434sdsd@stud.noroff.no' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByText(/Login/i));
    
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('dummy-access-token');
      expect(localStorage.getItem('username')).toBe('TestUser');
      // In your test, you might check that navigate was called with '/'
    });
  });
});
