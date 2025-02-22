import React, { useEffect, useState } from 'react';
import VenueCard from './VenueCard';
import { useLocation } from 'react-router-dom';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(21);
  
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

  // Filter venues based on search query (by name or description)
  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(query.toLowerCase()) ||
    venue.description.toLowerCase().includes(query.toLowerCase())
  );

  // Sort filtered venues based on sortOption
  const sortedVenues = [...filteredVenues].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.price - b.price;
    } else if (sortOption === 'price-desc') {
      return b.price - a.price;
    } else if (sortOption === 'newest') {
      return new Date(b.created) - new Date(a.created);
    }
    return 0;
  });

  // Display only a subset of the sorted venues
  const displayedVenues = sortedVenues.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 21, sortedVenues.length));
  };

  const handleShowLess = () => {
    setVisibleCount(20);
  };

  if (loading) return <p className="text-center my-4">Loading venues...</p>;
  if (error) return <p className="text-center text-danger my-4">Error: {error}</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Venue Listings</h2>
      {query && <p className="mb-3 text-center">Showing results for "{query}"</p>}
      {/* Sort Options */}
      <div className="d-flex mb-4">
        <label htmlFor="sort" className="me-2 align-self-center">Sort by:</label>
        <select
          id="sort"
          className="form-select w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
      <div className="row">
        {displayedVenues.length > 0 ? (
          displayedVenues.map((venue, index) => (
            <div
              key={venue.id}
              className="col-12 col-md-6 col-lg-4 mb-4 fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <VenueCard venue={venue} />
            </div>
          ))
        ) : (
          <p className="text-center">No venues found.</p>
        )}
      </div>
      <div className="d-flex justify-content-center my-4">
        {visibleCount < sortedVenues.length && (
          <button className="btn btn-primary me-2" onClick={handleShowMore}>
            Show More
          </button>
        )}
        {visibleCount > 21 && (
          <button className="btn btn-secondary" onClick={handleShowLess}>
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default VenueList;






