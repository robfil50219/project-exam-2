import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiKeyOptions } from '../apiConfig';

const AddVenue = () => {
  const token = localStorage.getItem('token'); // if required by the API
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    maxGuests: '',
    mediaUrl: 'https://example.com/image.jpg', // default image URL
    // Meta fields
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Construct payload with trimmed values and meta object
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      maxGuests: parseInt(form.maxGuests, 10),
      media: form.mediaUrl
        ? [{ url: form.mediaUrl.trim(), alt: `${form.name.trim()} image` }]
        : [],
      meta: {
        wifi: form.wifi,
        parking: form.parking,
        breakfast: form.breakfast,
        pets: form.pets,
      },
      // You can also provide a location object if needed, e.g., location: null
    };

    console.log('Add Venue payload:', JSON.stringify(payload));

    try {
      const response = await fetch('https://v2.api.noroff.dev/holidaze/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getApiKeyOptions(token).headers,
          // Include Authorization header if required:
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to create venue: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Venue created:', data);
      setSuccess('Venue created successfully!');
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center mb-4">Add Venue</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        {/* Venue Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Venue Name</label>
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
        {/* Price per Night */}
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
        {/* Image URL */}
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
            required
          />
        </div>
        {/* Meta Data */}
        <h5 className="mt-4">Amenities</h5>
        <div className="form-check">
          <input 
            type="checkbox" 
            name="wifi" 
            id="wifi" 
            className="form-check-input" 
            checked={form.wifi} 
            onChange={handleChange} 
          />
          <label className="form-check-label" htmlFor="wifi">WiFi</label>
        </div>
        <div className="form-check">
          <input 
            type="checkbox" 
            name="parking" 
            id="parking" 
            className="form-check-input" 
            checked={form.parking} 
            onChange={handleChange} 
          />
          <label className="form-check-label" htmlFor="parking">Parking</label>
        </div>
        <div className="form-check">
          <input 
            type="checkbox" 
            name="breakfast" 
            id="breakfast" 
            className="form-check-input" 
            checked={form.breakfast} 
            onChange={handleChange} 
          />
          <label className="form-check-label" htmlFor="breakfast">Breakfast</label>
        </div>
        <div className="form-check mb-4">
          <input 
            type="checkbox" 
            name="pets" 
            id="pets" 
            className="form-check-input" 
            checked={form.pets} 
            onChange={handleChange} 
          />
          <label className="form-check-label" htmlFor="pets">Pets Allowed</label>
        </div>
        <button type="submit" className="btn btn-primary">Create Venue</button>
      </form>
    </div>
  );
};

export default AddVenue;



