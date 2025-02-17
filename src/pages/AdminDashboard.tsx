import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, ToggleLeft, ToggleRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  // Staff Form State
  const [isStaffFormOpen, setIsStaffFormOpen] = useState<boolean>(true);
  const [formLoading, setFormLoading] = useState<boolean>(true);
  const [formError, setFormError] = useState<string>('');

  // Logs State
  const [logs, setLogs] = useState<any[]>([]);
  const [logsLoading, setLogsLoading] = useState<boolean>(true);
  const [logsError, setLogsError] = useState<string>('');

  // Fetch Staff Form Status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/.netlify/functions/staff-form-status');
        setIsStaffFormOpen(response.data.isStaffFormOpen);
      } catch (err) {
        setFormError('Failed to fetch staff form status.');
      } finally {
        setFormLoading(false);
      }
    };
    fetchStatus();
  }, []);

  // Fetch Interview Logs
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/.netlify/functions/get-logs');
        setLogs(response.data);
      } catch (err) {
        setLogsError('Failed to fetch logs.');
      } finally {
        setLogsLoading(false);
      }
    };
    fetchLogs();
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
      setFormError('Failed to update staff form status.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white py-20">
      <div className="container mx-auto px-4 space-y-12">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

        {/* Staff Form Toggle Section */}
        <div className="bg-white/5 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Staff Form Control</h2>
          {formLoading ? (
            <p className="text-center">Loading staff form status...</p>
          ) : formError ? (
            <p className="text-center text-red-500">{formError}</p>
          ) : (
            <>
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
              <div className="mt-4">
                <p className={`text-xl font-bold ${isStaffFormOpen ? 'text-green-400' : 'text-red-400'}`}>
                  {isStaffFormOpen ? 'Open' : 'Closed'}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Interview Logs Section */}
        <div className="bg-white/5 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Interview Logs</h2>
          {logsLoading ? (
            <p className="text-center">Loading logs...</p>
          ) : logsError ? (
            <p className="text-center text-red-500">{logsError}</p>
          ) : logs.length === 0 ? (
            <p className="text-center">No interview logs found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-700">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 p-2">Username</th>
                    <th className="border border-gray-600 p-2">Channel</th>
                    <th className="border border-gray-600 p-2">Joined At</th>
                    <th className="border border-gray-600 p-2">Left At</th>
                    <th className="border border-gray-600 p-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={index} className="border border-gray-700">
                      <td className="p-2">{log.username}</td>
                      <td className="p-2">{log.channel_name}</td>
                      <td className="p-2">{log.joined_at}</td>
                      <td className="p-2">{log.left_at}</td>
                      <td className="p-2">{log.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
