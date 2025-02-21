// src/components/MyBookings.js
import React, { useState, useEffect } from 'react';
import { getApiKeyOptions } from '../apiConfig';

const MyBookings = () => {
  const token = localStorage.getItem('token');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('You must be logged in to view your bookings.');
      setLoading(false);
      return;
    }
    // Fetch bookings for the logged-in user
    fetch('https://v2.api.noroff.dev/holidaze/bookings', {
      headers: {
        'Content-Type': 'application/json',
        ...getApiKeyOptions(token).headers,
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        return response.json();
      })
      .then(data => {
        // The API response should have a "data" property with an array of bookings
        setBookings(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (bookings.length === 0) return <p>You have no bookings.</p>;

  return (
    <div className="my-5">
      <h2>My Bookings</h2>
      <div className="list-group">
        {bookings.map((booking) => (
          <div key={booking.id} className="list-group-item">
            <h5>Booking ID: {booking.id}</h5>
            <p>
              <strong>Check-in:</strong>{' '}
              {new Date(booking.dateFrom).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-out:</strong>{' '}
              {new Date(booking.dateTo).toLocaleDateString()}
            </p>
            <p>
              <strong>Guests:</strong> {booking.guests}
            </p>
            {booking.venue && (
              <div>
                <p>
                  <strong>Venue:</strong> {booking.venue.name}
                </p>
                {booking.venue.media && booking.venue.media.length > 0 && (
                  <img
                    src={booking.venue.media[0].url}
                    alt={booking.venue.media[0].alt || booking.venue.name}
                    className="img-fluid"
                    style={{ maxWidth: '200px' }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
