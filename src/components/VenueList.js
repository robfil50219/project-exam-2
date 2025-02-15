// src/components/VenueList.js
import React, { useEffect, useState } from 'react';
import VenueCard from './VenueCard';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://v2.api.noroff.dev/holidaze/venues')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('API response:', data);
        // Adjust based on the actual structure
        setVenues(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching venues:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {venues.length === 0 ? (
        <p>No venues available</p>
      ) : (
        venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
      )}
    </div>
  );
};

export default VenueList;


