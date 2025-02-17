import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, ToggleLeft, ToggleRight, RefreshCcw, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Log {
  username: string;
  channel_name: string;
  joined_at: string;
  left_at: string;
  duration: string;
  // You can add more fields as needed
}

const AdminDashboard: React.FC = () => {
  // Staff Form State
  const [isStaffFormOpen, setIsStaffFormOpen] = useState<boolean>(true);
  const [formLoading, setFormLoading] = useState<boolean>(true);
  const [formError, setFormError] = useState<string>('');

  // Logs State
  const [logs, setLogs] = useState<Log[]>([]);
  const [logsLoading, setLogsLoading] = useState<boolean>(true);
  const [logsError, setLogsError] = useState<string>('');

  // Additional States for interactions
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>(''); // e.g., 'username', 'joined_at'
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const logsPerPage = 10;
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  // Fetch Interview Logs function
  const fetchLogs = async () => {
    setLogsLoading(true);
    try {
      const response = await axios.get('/.netlify/functions/get-logs');
      setLogs(response.data);
      setLogsError('');
    } catch (err) {
      setLogsError('Failed to fetch logs.');
    } finally {
      setLogsLoading(false);
    }
  };

  // Initial logs fetch
  useEffect(() => {
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

  // Sorting function for logs
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortKey === key && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortKey(key);
    setSortDirection(direction);
  };

  // Filter and sort logs based on search and sort states
  const filteredLogs = logs
    .filter((log) =>
      log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.channel_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const aKey = a[sortKey as keyof Log];
      const bKey = b[sortKey as keyof Log];
      if (aKey < bKey) return sortDirection === 'asc' ? -1 : 1;
      if (aKey > bKey) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const openModal = (log: Log) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLog(null);
    setIsModalOpen(false);
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Interview Logs</h2>
            <button 
              onClick={fetchLogs} 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
            >
              <RefreshCcw className="w-5 h-5" />
              Refresh Logs
            </button>
          </div>
          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to first page on new search
              }}
              placeholder="Search by username or channel..."
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            />
          </div>
          {logsLoading ? (
            <p className="text-center">Loading logs...</p>
          ) : logsError ? (
            <p className="text-center text-red-500">{logsError}</p>
          ) : filteredLogs.length === 0 ? (
            <p className="text-center">No interview logs found.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-700">
                  <thead>
                    <tr className="bg-gray-700">
                      <th 
                        className="border border-gray-600 p-2 cursor-pointer"
                        onClick={() => handleSort('username')}
                      >
                        Username {sortKey === 'username' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                      <th 
                        className="border border-gray-600 p-2 cursor-pointer"
                        onClick={() => handleSort('channel_name')}
                      >
                        Channel {sortKey === 'channel_name' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                      <th 
                        className="border border-gray-600 p-2 cursor-pointer"
                        onClick={() => handleSort('joined_at')}
                      >
                        Joined At {sortKey === 'joined_at' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                      <th 
                        className="border border-gray-600 p-2 cursor-pointer"
                        onClick={() => handleSort('left_at')}
                      >
                        Left At {sortKey === 'left_at' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                      <th 
                        className="border border-gray-600 p-2 cursor-pointer"
                        onClick={() => handleSort('duration')}
                      >
                        Duration {sortKey === 'duration' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLogs.map((log, index) => (
                      <tr 
                        key={index} 
                        className="border border-gray-700 hover:bg-gray-600 cursor-pointer transition"
                        onClick={() => openModal(log)}
                      >
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

              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-4 gap-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal for Log Details */}
      {isModalOpen && selectedLog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/2 relative">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold mb-4">Log Details</h3>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Username:</span> {selectedLog.username}
              </p>
              <p>
                <span className="font-semibold">Channel:</span> {selectedLog.channel_name}
              </p>
              <p>
                <span className="font-semibold">Joined At:</span> {selectedLog.joined_at}
              </p>
              <p>
                <span className="font-semibold">Left At:</span> {selectedLog.left_at}
              </p>
              <p>
                <span className="font-semibold">Duration:</span> {selectedLog.duration}
              </p>
              {/* Add more details here if available */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
