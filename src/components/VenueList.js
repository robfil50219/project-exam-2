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
        // If the API response is wrapped in an object (e.g., { data: [...] }), adjust accordingly.
        setVenues(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching venues:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center my-4">Loading venues...</p>;
  if (error) return <p className="text-center text-danger my-4">Error: {error}</p>;

  return (
    <div className="container my-4">
      <div className="row">
        {venues.map((venue) => (
          <div key={venue.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueList;



