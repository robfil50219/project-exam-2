// src/pages/AddListing.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiKeyOptions } from '../apiConfig';

const AddListing = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Form state for creating a listing.
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    maxGuests: '',
    mediaUrl: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Construct the payload as per API requirements.
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      maxGuests: parseInt(form.maxGuests, 10),
      // Media is expected as an array; we use a single media item if provided.
      media: form.mediaUrl ? [{ url: form.mediaUrl, alt: form.name + ' image' }] : [],
    };

    console.log('Add Listing payload:', JSON.stringify(payload));

    try {
      const response = await fetch('https://v2.api.noroff.dev/holidaze/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getApiKeyOptions(token).headers,
          // Note: Depending on API, you might also need an Authorization header.
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to create listing: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Add Listing response:', data);
      setSuccess('Listing created successfully!');
      // Optionally, redirect the user to their listings page
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // If not logged in, you may want to redirect or show an error (not implemented here)

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center mb-4">Add a New Listing</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        {/* Listing Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Listing Name</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            className="form-control" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            name="description" 
            id="description" 
            className="form-control" 
            rows="4"
            value={form.description} 
            onChange={handleChange} 
            required
          ></textarea>
        </div>
        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price per Night ($)</label>
          <input 
            type="number" 
            name="price" 
            id="price" 
            className="form-control" 
            value={form.price} 
            onChange={handleChange} 
            required
            min="0"
            step="0.01"
          />
        </div>
        {/* Maximum Guests */}
        <div className="mb-3">
          <label htmlFor="maxGuests" className="form-label">Maximum Guests</label>
          <input 
            type="number" 
            name="maxGuests" 
            id="maxGuests" 
            className="form-control" 
            value={form.maxGuests} 
            onChange={handleChange} 
            required
            min="1"
          />
        </div>
        {/* Media URL */}
        <div className="mb-3">
          <label htmlFor="mediaUrl" className="form-label">Image URL</label>
          <input 
            type="url" 
            name="mediaUrl" 
            id="mediaUrl" 
            className="form-control" 
            placeholder="https://example.com/image.jpg"
            value={form.mediaUrl} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Listing</button>
      </form>
    </div>
  );
};

export default AddListing;
