// src/pages/BookVenue.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApiKeyOptions } from '../apiConfig';

const BookVenue = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    dateFrom: '',
    dateTo: '',
    guests: 1,
  });
  
  useEffect(() => {
    // Fetch venue details (optional, for display)
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, getApiKeyOptions())
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error fetching venue details');
        }
        return res.json();
      })
      .then((data) => {
        setVenue(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Example: Booking API call
    const payload = {
      venueId: id,
      dateFrom: form.dateFrom,
      dateTo: form.dateTo,
      guests: parseInt(form.guests, 10),
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://v2.api.noroff.dev/holidaze/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getApiKeyOptions(token).headers,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to create booking: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Booking created:', data);
      alert('Booking created successfully!');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (loading) return <p>Loading venue details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container my-5">
      {venue && (
        <div>
          <h1 className="display-4">{venue.name}</h1>
          <p>{venue.description}</p>
        </div>
      )}
      <h2>Book this Venue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dateFrom" className="form-label">Check-in Date</label>
          <input 
            type="date" 
            name="dateFrom" 
            id="dateFrom" 
            className="form-control"
            value={form.dateFrom}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateTo" className="form-label">Check-out Date</label>
          <input 
            type="date" 
            name="dateTo" 
            id="dateTo" 
            className="form-control"
            value={form.dateTo}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="guests" className="form-label">Number of Guests</label>
          <input 
            type="number" 
            name="guests" 
            id="guests" 
            className="form-control"
            value={form.guests}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <button type="submit" className="btn btn-primary">Book Now</button>
      </form>
    </div>
  );
};

export default BookVenue;

