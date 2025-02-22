import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyBookings from '../components/MyBookings';

global.fetch = jest.fn();

describe('MyBookings Component', () => {
  const dummyBookings = [
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
  ];

  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders bookings after fetching', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: dummyBookings }),
    });

    render(
      <Router>
        <MyBookings />
      </Router>
    );

    expect(screen.getByText(/Loading your bookings/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/Booking ID/i)).toBeInTheDocument());
    expect(screen.getByText(/Venue One/i)).toBeInTheDocument();
  });

  test('cancels a booking when cancel button is clicked', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: dummyBookings }),
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    // Override window.confirm to simulate confirmation
    window.confirm = jest.fn(() => true);

    render(
      <Router>
        <MyBookings />
      </Router>
    );

    await waitFor(() => expect(screen.getByText(/Venue One/i)).toBeInTheDocument());

    const cancelButton = screen.getByRole('button', { name: /Cancel Booking/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText(/Booking ID: booking1/i)).not.toBeInTheDocument();
    });
  });
});