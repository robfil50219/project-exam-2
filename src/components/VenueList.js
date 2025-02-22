// src/components/VenueList.js
import React, { useEffect, useState } from 'react';
import VenueCard from './VenueCard';
import { useLocation } from 'react-router-dom';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read the query parameter from the URL
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    fetch('https://v2.api.noroff.dev/holidaze/venues')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setVenues(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching venues:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter venues based on the search query (by name or description)
  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(query.toLowerCase()) ||
    venue.description.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p className="text-center my-4">Loading venues...</p>;
  if (error) return <p className="text-center text-danger my-4">Error: {error}</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Venue Listings</h2>
      {query && <p className="mb-3 text-center">Showing results for "{query}"</p>}
      <div className="row">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <div key={venue.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <VenueCard venue={venue} />
            </div>
          ))
        ) : (
          <p className="text-center">No venues found.</p>
        )}
      </div>
    </div>
  );
};

export default VenueList;






