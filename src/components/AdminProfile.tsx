import React, { useState } from 'react';

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    username: 'AdminUser',
    email: 'admin@example.com',
    password: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API to update profile
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-8">
      <h2 className="text-3xl font-bold mb-6">Admin Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          className="w-full bg-gray-700 p-3 rounded"
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="w-full bg-gray-700 p-3 rounded"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
          className="w-full bg-gray-700 p-3 rounded"
          placeholder="Current Password"
        />
        <input
          type="password"
          name="newPassword"
          value={profile.newPassword}
          onChange={handleChange}
          className="w-full bg-gray-700 p-3 rounded"
          placeholder="New Password"
        />
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 p-3 rounded text-white">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
