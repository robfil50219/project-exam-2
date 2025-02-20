import React from 'react';
import { Link } from 'react-router-dom';

const VenueCard = ({ venue }) => {
  // Use the first image from the media array as a thumbnail, or a placeholder if none exists
  const thumbnail = venue.media && venue.media.length > 0 ? venue.media[0].url : 'https://via.placeholder.com/400';

  return (
    <div className="card mb-4">
      <img 
        src={thumbnail} 
        className="card-img-top" 
        alt={venue.name} 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <div className="card-body">
        <h5 className="card-title">{venue.name}</h5>
        <p className="card-text">{venue.description.substring(0, 100)}...</p>
        <p className="card-text font-weight-bold">${venue.price} per night</p>
        <Link to={`/venues/${venue.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VenueCard;

