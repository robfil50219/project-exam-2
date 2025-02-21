// src/pages/VenueDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApiKeyOptions } from '../apiConfig';

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, getApiKeyOptions())
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error fetching venue details');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Venue details:', data);
        setVenue(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading venue details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!venue) return <p>No venue found</p>;

  return (
    <div className="container my-5">
      <h1>{venue.name}</h1>
      <p>{venue.description}</p>
      <p>
        <strong>Price:</strong> ${venue.price}
      </p>
      <p>
        <strong>Max Guests:</strong> {venue.maxGuests}
      </p>
      <p>
        <strong>Rating:</strong> {venue.rating}
      </p>
      {venue.media && venue.media.length > 0 && (
        <div className="my-4">
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt || venue.name}
            className="img-fluid"
          />
        </div>
      )}
      {/* Book Now Button */}
      <div className="my-4">
        <Link to={`/book-venue/${venue.id}`} className="btn btn-primary">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default VenueDetails;


