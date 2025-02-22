import React, { useEffect, useState } from 'react';
import VenueCard from './VenueCard';
import { useLocation } from 'react-router-dom';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get the query parameter from the URL
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
        // If the API response is wrapped in an object, adjust accordingly.
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
      {query && <p>Showing results for "{query}"</p>}
      <div className="row">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <div key={venue.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <VenueCard venue={venue} />
            </div>
          ))
        ) : (
          <p>No venues found.</p>
        )}
      </div>
    </div>
  );
};

export default VenueList;




