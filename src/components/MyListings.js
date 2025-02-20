import React, { useState, useEffect } from 'react';
import { getApiKeyOptions } from '../apiConfig';

const MyListings = ({ username, token }) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username || !token) {
      setError("No username or token provided.");
      setLoading(false);
      return;
    }
    fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}/venues`, getApiKeyOptions(token))
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch listings');
        }
        return res.json();
      })
      .then((data) => {
        // The response is expected to have a "data" property that is an array
        setVenues(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username, token]);

  if (loading) return <p>Loading your listings...</p>;
  if (error) return <p className="text-danger">Error loading listings: {error}</p>;
  if (venues.length === 0) return <p>You don't have any listings yet.</p>;

  return (
    <div className="my-5">
      <h2 className="mb-4">My Listings</h2>
      <div className="row">
        {venues.map((venue) => (
          <div key={venue.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {venue.media && venue.media.length > 0 && (
                <img 
                  src={venue.media[0].url} 
                  alt={venue.media[0].alt || venue.name} 
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{venue.name}</h5>
                <p className="card-text">{venue.description.substring(0, 100)}...</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
