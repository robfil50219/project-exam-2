import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import VenueList from '../components/VenueList';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the fetch call
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: [
      { id: '1', name: 'Venue One', description: 'A great venue', price: 100, maxGuests: 4, created: '2025-02-22T10:00:00Z', media: [] },
      { id: '2', name: 'Venue Two', description: 'Another great venue', price: 150, maxGuests: 6, created: '2025-02-21T10:00:00Z', media: [] },
      // ... add more venues if needed
    ]}),
  })
);

describe('VenueList Component', () => {
  test('renders loading message initially and then venue cards', async () => {
    render(
      <Router>
        <VenueList />
      </Router>
    );
    expect(screen.getByText(/Loading venues/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Venue Listings/i)).toBeInTheDocument();
    });

    // Check that at least one venue card is rendered
    expect(screen.getByText(/Venue One/i)).toBeInTheDocument();
    expect(screen.getByText(/Venue Two/i)).toBeInTheDocument();
  });
});
