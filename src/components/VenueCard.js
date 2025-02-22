import React from 'react';
import { Link } from 'react-router-dom';

const VenueCard = ({ venue }) => {
  // Use first image from the media array, or a working placeholder if not available.
  const thumbnail = venue.media && venue.media.length > 0 
    ? venue.media[0].url 
    : 'https://via.placeholder.com/400x200?text=No+Image';

  // Build a location string from available location details.
  let locationString = '';
  if (venue.location) {
    const { address, city, country } = venue.location;
    locationString = [address, city, country].filter(Boolean).join(', ');
  }

  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={thumbnail} 
        className="card-img-top" 
        alt={venue.name} 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{venue.name}</h5>
        {locationString && (
          <p className="card-text text-muted small mb-2">
            {locationString}
          </p>
        )}
        <p className="card-text">
          {venue.description ? venue.description.substring(0, 100) + '...' : ''}
        </p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <p className="fw-bold mb-0">${venue.price} per night</p>
          <Link to={`/venues/${venue.id}`} className="btn btn-outline-secondary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;