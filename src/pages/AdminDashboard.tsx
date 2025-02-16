import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, ToggleLeft, ToggleRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminProfile from '../components/AdminProfile';
import AdminActivityLogs from '../components/AdminActivityLogs';
import Notifications from '../components/Notifications';
import FormStats from '../components/FormStats';
import DashboardMetrics from '../components/DashboardMetrics';

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

  if (loading) return <p className="text-center text-white mt-20 text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-20 text-xl">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white py-20">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto bg-white/5 p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-center">
            Admin Dashboard
          </h1>

          {/* Notifications Component */}
          <Notifications />

          {/* Toggle Staff Form Section */}
          <div className="mb-8 bg-white/5 p-6 rounded-xl space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Toggle Staff Form</h2>
            <button
              onClick={toggleStaffForm}
              className={`w-full px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-3 ${
                isStaffFormOpen 
                  ? 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800' 
                  : 'bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800'
              }`}
            >
              {isStaffFormOpen ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              {isStaffFormOpen ? 'Turn Off Staff Form' : 'Turn On Staff Form'}
            </button>
          </div>

          <div className="bg-white/5 p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-semibold mb-4">Current Form Status</h2>
            <p className={`text-xl font-bold ${isStaffFormOpen ? 'text-green-400' : 'text-red-400'}`}>
              {isStaffFormOpen ? 'Open' : 'Closed'}
            </p>
          </div>

          {/* Real-time Form Stats */}
          <div className="mb-8">
            <FormStats />
          </div>

          {/* Dashboard Metrics */}
          <div className="mb-8">
            <DashboardMetrics />
          </div>

          {/* Admin Profile */}
          <div className="mb-8">
            <AdminProfile />
          </div>

          {/* Admin Activity Logs */}
          <div>
            <AdminActivityLogs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
