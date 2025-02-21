// src/components/MyBookings.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApiKeyOptions } from '../apiConfig';

const MyBookings = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch bookings for the logged-in user
  useEffect(() => {
    if (!token || !username) {
      setError('You must be logged in to view your bookings.');
      setLoading(false);
      return;
    }
    fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}/bookings`, {
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
        setBookings(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [token, username]);

  // Function to cancel (delete) a booking
  const handleCancel = async (bookingId) => {
    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getApiKeyOptions(token).headers,
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
      // Remove the cancelled booking from state
      setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

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
              <strong>Check-in:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-out:</strong> {new Date(booking.dateTo).toLocaleDateString()}
            </p>
            <p>
              <strong>Guests:</strong> {booking.guests}
            </p>
            {booking.venue ? (
              <div>
                <p>
                  <strong>Venue:</strong>{' '}
                  <Link to={`/venues/${booking.venue.id}`}>
                    {booking.venue.name}
                  </Link>
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
            ) : booking.venueId ? (
              <div>
                <p>
                  <strong>Venue:</strong>{' '}
                  <Link to={`/venues/${booking.venueId}`}>View Venue</Link>
                </p>
              </div>
            ) : (
              <p><strong>Venue:</strong> Venue information not available</p>
            )}
            {/* Cancel Booking Button */}
            <button 
              className="btn btn-danger mt-3" 
              onClick={() => handleCancel(booking.id)}
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;




