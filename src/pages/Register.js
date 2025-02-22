import React, { useState } from 'react';
import { getApiKeyOptions } from '../apiConfig';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    avatarUrl: '',
    avatarAlt: '',
    bannerUrl: '',
    bannerAlt: '',
    venueManager: false,
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
  
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      // For now, send only the required fields for minimal testing.
    };
  
    console.log('Registration payload:', JSON.stringify(payload));
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: {
          ...getApiKeyOptions().headers,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        // Try to parse and log the error response
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        throw new Error(`Registration failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Registration response:', data);
      setSuccess('Registration successful. You can now log in.');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center mb-4">Register</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            className="form-control" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
          <small className="form-text text-muted">
            Use only letters, numbers, and underscores.
          </small>
        </div>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            className="form-control" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
          <small className="form-text text-muted">
            Must be a valid stud.noroff.no email address.
          </small>
        </div>
        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            className="form-control" 
            value={form.password} 
            onChange={handleChange} 
            required 
            minLength="8"
          />
          <small className="form-text text-muted">
            Password must be at least 8 characters long.
          </small>
        </div>
        {/* Optional fields can be added later */}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;