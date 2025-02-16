import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProfile = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios.get('/.netlify/functions/admin-profile');
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="bg-white/10 p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Admin Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Last Login:</strong> {new Date(profile.lastLogin).toLocaleString()}</p>
    </div>
  );
};

export default AdminProfile;
