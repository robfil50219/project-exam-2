import React from 'react';
import VenueList from '../components/VenueList';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-500 text-center mb-8">Venue Listing</h1>
      <VenueList />
    </div>
  );
};

export default Home;
