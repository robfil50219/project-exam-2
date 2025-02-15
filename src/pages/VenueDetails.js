import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Venue details:', data);

        setVenue(data.data || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching venue details:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading venue details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!venue) return <p>No venue found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{venue.name}</h1>
      <p>{venue.description}</p>
      
      {venue.media && venue.media.length > 0 && (
        <img 
          src={venue.media[0].url} 
          alt={venue.name} 
          className="mt-4 rounded w-full max-w-md" 
        />
      )}
      
      <div className="mt-4">
        <p>
          <strong>Location:</strong> {venue.location.address}, {venue.location.city}, {venue.location.country}
        </p>
        <p>
          <strong>Max Guests:</strong> {venue.maxGuests}
        </p>
        <p>
          <strong>Price:</strong> ${venue.price}
        </p>
        <p>
          <strong>Rating:</strong> {venue.rating}
        </p>
        {venue.meta && (
          <div className="mt-4">
            <strong>Amenities:</strong>
            <ul>
              {Object.entries(venue.meta).map(([key, value]) => (
                <li key={key}>
                  {key}: {value ? 'Yes' : 'No'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Future integration: Add booking options here */}
    </div>
  );
};

export default VenueDetails;


