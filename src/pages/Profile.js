import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch the current user's profile data
  useEffect(() => {
    if (!token) {
      // Redirect to login if no token exists
      navigate('/login');
      return;
    }
    fetch('https://v2.api.noroff.dev/holidaze/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        return res.json();
      })
      .then((data) => {
        // Assume API returns user data directly
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token, navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    fetch('https://v2.api.noroff.dev/holidaze/users/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update profile');
        }
        return res.json();
      })
      .then((data) => {
        setSuccess('Profile updated successfully.');
        setUserData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) return <p className="text-center my-4">Loading profile...</p>;
  if (error) return <p className="text-center text-danger my-4">Error: {error}</p>;

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center mb-4">My Profile</h1>
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">Avatar URL</label>
          <input
            type="text"
            name="avatar"
            id="avatar"
            className="form-control"
            value={userData.avatar}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
