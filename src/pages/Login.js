import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiKeyOptions } from '../apiConfig';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
          ...getApiKeyOptions().headers,
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Login response:', data);
      // Update: store token from data.data.accessToken
      localStorage.setItem('token', data.data.accessToken);
      localStorage.setItem('username', data.data.name);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center mb-4">Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        </div>
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
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
