// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import VenueDetails from './pages/VenueDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AddVenue from './pages/AddVenue';
import EditVenue from './pages/EditVenue';
import BookVenue from './pages/BookVenue';
import VenueSearch from './components/VenueSearch';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venues/:id" element={<VenueDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-venue" element={<AddVenue />} />
            <Route path="/edit-venue/:id" element={<EditVenue />} />
            <Route path="/book-venue/:id" element={<BookVenue />} />
            <Route path="/search" element={<VenueSearch />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;