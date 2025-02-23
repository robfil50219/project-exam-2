// src/tests/MyBookings.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyBookings from '../components/MyBookings';

beforeEach(() => {
  localStorage.setItem('token', 'dummy-token');
  // If your component uses username as well:
  localStorage.setItem('username', 'testuser');
});

afterEach(() => {
  localStorage.clear();
  jest.resetAllMocks();
});

test('renders bookings after fetching', async () => {
  // Mock fetch to return dummy bookings
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        data: [
          {
            id: 'booking1',
            dateFrom: '2025-03-01T00:00:00.000Z',
            dateTo: '2025-03-05T00:00:00.000Z',
            guests: 2,
            venue: {
              id: '1',
              name: 'Venue One',
              media: [{ url: 'https://example.com/image1.jpg', alt: 'Image 1' }],
            },
          },
        ],
      }),
    })
  );

  render(
    <MemoryRouter>
      <MyBookings />
    </MemoryRouter>
  );

  // Wait for the booking data to appear
  await waitFor(() => expect(screen.getByText(/Venue One/i)).toBeInTheDocument());
});

test('cancels a booking when cancel button is clicked', async () => {
  // Setup your dummy booking data and mock fetch calls
  global.fetch = jest.fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        data: [
          {
            id: 'booking1',
            dateFrom: '2025-03-01T00:00:00.000Z',
            dateTo: '2025-03-05T00:00:00.000Z',
            guests: 2,
            venue: {
              id: '1',
              name: 'Venue One',
              media: [{ url: 'https://example.com/image1.jpg', alt: 'Image 1' }],
            },
          },
        ],
      }),
    })
    .mockResolvedValueOnce({ ok: true }); // for DELETE

  window.confirm = jest.fn(() => true);

  render(
    <MemoryRouter>
      <MyBookings />
    </MemoryRouter>
  );

  await waitFor(() => expect(screen.getByText(/Venue One/i)).toBeInTheDocument());
  const cancelButton = screen.getByRole('button', { name: /Cancel Booking/i });
  fireEvent.click(cancelButton);
  await waitFor(() => expect(screen.queryByText(/Venue One/i)).not.toBeInTheDocument());
});