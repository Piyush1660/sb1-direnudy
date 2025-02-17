import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, ToggleLeft, ToggleRight, RefreshCcw, X, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Log {
  username: string;
  channel_name: string;
  joined_at: string;
  left_at: string;
  duration: string; // assume duration in minutes as string (e.g., "15")
  // add other fields if available
}

const AdminDashboard: React.FC = () => {
  // Staff Form State
  const [isStaffFormOpen, setIsStaffFormOpen] = useState<boolean>(false);
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

  // Date range filter states
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

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
      showToast('Logs refreshed successfully!', 'success');
    } catch (err) {
      setLogsError('Failed to fetch logs.');
      showToast('Failed to refresh logs.', 'error');
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
      showToast('Staff form status updated!', 'success');
    } catch (err) {
      setFormError('Failed to update staff form status.');
      showToast('Error updating staff form status.', 'error');
    }
  };

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
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

  // Combined filtering: by search term and date range
  const filteredLogs = logs
    .filter((log) => {
      // Filter by search term (username or channel)
      const matchesSearch =
        log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.channel_name.toLowerCase().includes(searchTerm.toLowerCase());
      // Filter by date range if provided (using joined_at date)
      let matchesDate = true;
      if (fromDate) {
        matchesDate = new Date(log.joined_at) >= new Date(fromDate);
      }
      if (toDate) {
        matchesDate = matchesDate && new Date(log.joined_at) <= new Date(toDate);
      }
      return matchesSearch && matchesDate;
    })
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

  // Calculate summary metrics
  const totalLogs = filteredLogs.length;
  const averageDuration =
    totalLogs > 0
      ? (
          filteredLogs.reduce((sum, log) => sum + parseFloat(log.duration || '0'), 0) /
          totalLogs
        ).toFixed(2)
      : '0';

  // Prepare data for the chart (logs per day)
  const logsByDate: { [date: string]: number } = {};
  logs.forEach((log) => {
    const date = new Date(log.joined_at).toLocaleDateString();
    logsByDate[date] = (logsByDate[date] || 0) + 1;
  });
  const chartData = {
    labels: Object.keys(logsByDate),
    datasets: [
      {
        label: 'Logs Count',
        data: Object.values(logsByDate),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  // Export logs to CSV
  const exportLogsToCSV = () => {
    const headers = ['Username', 'Channel', 'Joined At', 'Left At', 'Duration'];
    const csvRows = [headers.join(',')];
    filteredLogs.forEach((log) => {
      const row = [log.username, log.channel_name, log.joined_at, log.left_at, log.duration];
      csvRows.push(row.join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'logs.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Logs exported to CSV!', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white py-20 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 ${
            toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {toastMessage}
        </div>
      )}
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-xl shadow-lg text-center">
            <p className="text-3xl font-bold">{totalLogs}</p>
            <p>Total Logs</p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl shadow-lg text-center">
            <p className="text-3xl font-bold">{averageDuration}</p>
            <p>Avg. Duration (min)</p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl shadow-lg text-center">
            <p className="text-3xl font-bold">{logs.length}</p>
            <p>All Logs (Unfiltered)</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white/5 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Logs Over Time</h2>
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>

        {/* Interview Logs Section */}
        <div className="bg-white/5 p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <h2 className="text-2xl font-semibold">Interview Logs</h2>
            <div className="flex gap-2">
              <button
                onClick={fetchLogs}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                <RefreshCcw className="w-5 h-5" />
                Refresh Logs
              </button>
              <button
                onClick={exportLogsToCSV}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition"
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by username or channel..."
              className="w-full md:w-1/3 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
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
