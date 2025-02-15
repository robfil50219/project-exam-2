import React from 'react';
import { Link } from 'react-router-dom';

const VenueCard = ({ venue }) => {
  // Extracting media URL if available
  const thumbnail = venue.media && venue.media.length > 0 ? venue.media[0].url : '';

  return (
    <div className="p-4 bg-white shadow rounded">
      <Link to={`/venues/${venue.id}`}>
        <h3 className="text-xl font-semibold">{venue.name}</h3>
        {thumbnail && (
          <img src={thumbnail} alt={venue.name} className="mt-2 rounded" />
        )}
        <p className="mt-2 text-gray-600">{venue.description}</p>
        <p className="mt-2 font-bold">Price: ${venue.price}</p>
        <p className="mt-2">Rating: {venue.rating}</p>
        <p className="mt-2">Max Guests: {venue.maxGuests}</p>
        <p className="mt-2">
          Location: {venue.location.address}, {venue.location.city}, {venue.location.country}
        </p>
      </Link>
    </div>
  );
};

export default VenueCard;
