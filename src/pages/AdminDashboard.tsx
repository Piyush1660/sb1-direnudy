import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const [isStaffFormOpen, setIsStaffFormOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/.netlify/functions/staff-form-status');
        setIsStaffFormOpen(response.data.isStaffFormOpen);
      } catch (err) {
        setError('Failed to fetch staff form status.');
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const toggleStaffForm = async () => {
    try {
      const newState = !isStaffFormOpen;
      setIsStaffFormOpen(newState);

      await axios.post(
        '/.netlify/functions/staff-form-status',
        { isStaffFormOpen: newState },
        {
          headers: {
            'x-access-token': localStorage.getItem('adminToken') || '', 
          },
        }
      );
    } catch (err) {
      setError('Failed to update staff form status.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard p-6 bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl mb-4">Toggle Staff Form</h2>
        <button
          onClick={toggleStaffForm}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            isStaffFormOpen ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {isStaffFormOpen ? 'Turn Off Staff Form' : 'Turn On Staff Form'}
        </button>
      </div>
      <div>
        <h2 className="text-xl mb-4">Current Form Status: {isStaffFormOpen ? 'Open' : 'Closed'}</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;
