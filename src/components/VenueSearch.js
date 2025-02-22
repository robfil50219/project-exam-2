import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VenueSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      const data = await response.json();
      setResults(data.data || []);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Search Venues</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control"
            placeholder="Enter venue name or description"
            required
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {results.length > 0 ? (
        <ul className="list-group">
          {results.map((venue) => (
            <li key={venue.id} className="list-group-item">
              <Link to={`/venues/${venue.id}`}>{venue.name}</Link>
              <p className="mb-0">{venue.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No venues found.</p>
      )}
    </div>
  );
};

export default VenueSearch;
