// src/pages/Home.js
import React from 'react';
import VenueList from '../components/VenueList';
import NewestVenuesCarousel from '../components/NewestVenuesCarousel';

const Home = () => (
  <div>
    <NewestVenuesCarousel />
    <VenueList />
  </div>
);

export default Home;

