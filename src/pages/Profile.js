import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiKeyOptions } from '../apiConfig';
import MyListings from '../components/MyListings';

const Profile = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: { url: '', alt: '' },
    banner: { url: '', alt: '' },
    venueManager: false,
    _count: { venues: 0, bookings: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!token || !username) {
      navigate('/login');
      return;
    }
    fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, getApiKeyOptions(token))
      .then((res) => {
        console.log('Profile fetch response status:', res.status);
        if (!res.ok) {
          throw new Error('Failed to fetch profile data');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched profile data:', data);
        setUserData(data.data || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [token, username, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('avatar.')) {
      const field = name.split('.')[1];
      setUserData((prev) => ({
        ...prev,
        avatar: { ...prev.avatar, [field]: value },
      }));
    } else if (name.startsWith('banner.')) {
      const field = name.split('.')[1];
      setUserData((prev) => ({
        ...prev,
        banner: { ...prev.banner, [field]: value },
      }));
    } else if (type === 'checkbox') {
      setUserData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getApiKeyOptions(token).headers,
      },
      body: JSON.stringify({
        bio: userData.bio,
        avatar: userData.avatar.url ? userData.avatar : undefined,
        banner: userData.banner.url ? userData.banner : undefined,
        venueManager: userData.venueManager,
      }),
    })
      .then((res) => {
        console.log('Profile update response status:', res.status);
        if (!res.ok) {
          throw new Error('Failed to update profile');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Updated profile data:', data);
        setSuccess('Profile updated successfully.');
        setUserData(data.data || data);
        setEditMode(false);
      })
      .catch((err) => {
        console.error('Error updating profile:', err);
        setError(err.message);
      });
  };

  if (loading) return <p className="text-center my-4">Loading profile...</p>;
  if (error) return <p className="text-center text-danger my-4">Error: {error}</p>;

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center mb-4">My Profile</h1>
      
      {/* Display Profile Info */}
      <div className="row mb-4">
        <div className="col-md-4 text-center">
          {userData.avatar.url ? (
            <img
              src={userData.avatar.url}
              alt={userData.avatar.alt || 'Avatar'}
              className="img-fluid rounded-circle mb-3"
              style={{ maxWidth: '200px' }}
            />
          ) : (
            <div className="alert alert-secondary">No Avatar Available</div>
          )}
        </div>
        <div className="col-md-8">
          <h3>{userData.name}</h3>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Bio:</strong> {userData.bio || 'No bio provided.'}</p>
          <p><strong>Venue Manager:</strong> {userData.venueManager ? 'Yes' : 'No'}</p>
        </div>
      </div>

      {userData.banner.url && (
        <div className="mb-4">
          <img
            src={userData.banner.url}
            alt={userData.banner.alt || 'Banner'}
            className="img-fluid w-100"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>
      )}

      {success && <div className="alert alert-success">{success}</div>}

      {!editMode ? (
        <div className="text-center mb-4">
          <button className="btn btn-secondary" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="bio" className="form-label">Bio</label>
            <textarea
              name="bio"
              id="bio"
              className="form-control"
              rows="3"
              value={userData.bio}
              onChange={handleChange}
              maxLength="160"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="avatarUrl" className="form-label">Avatar URL</label>
            <input
              type="text"
              name="avatar.url"
              id="avatarUrl"
              className="form-control"
              value={userData.avatar.url}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="avatarAlt" className="form-label">Avatar Alt Text</label>
            <input
              type="text"
              name="avatar.alt"
              id="avatarAlt"
              className="form-control"
              value={userData.avatar.alt}
              onChange={handleChange}
              maxLength="120"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bannerUrl" className="form-label">Banner URL</label>
            <input
              type="text"
              name="banner.url"
              id="bannerUrl"
              className="form-control"
              value={userData.banner.url}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bannerAlt" className="form-label">Banner Alt Text</label>
            <input
              type="text"
              name="banner.alt"
              id="bannerAlt"
              className="form-control"
              value={userData.banner.alt}
              onChange={handleChange}
              maxLength="120"
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="venueManager"
              id="venueManager"
              className="form-check-input"
              checked={userData.venueManager}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="venueManager">
              Venue Manager
            </label>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Update Profile</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* My Listings Section */}
      <MyListings username={username} token={token} />
    </div>
  );
};

export default Profile;


