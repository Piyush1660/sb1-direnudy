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
  duration: string;
}

const AdminDashboard: React.FC = () => {
  const [isStaffFormOpen, setIsStaffFormOpen] = useState<boolean>(true);
  const [formLoading, setFormLoading] = useState<boolean>(true);
  const [formError, setFormError] = useState<string>('');

  const [logs, setLogs] = useState<Log[]>([]);
  const [logsLoading, setLogsLoading] = useState<boolean>(true);
  const [logsError, setLogsError] = useState<string>('');

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const logsPerPage = 10;
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/.netlify/functions/toggle-form-status');
        setIsStaffFormOpen(response.data.isStaffFormOpen);
      } catch (err) {
        setFormError('Failed to fetch staff form status.');
      } finally {
        setFormLoading(false);
      }
    };
    fetchStatus();
  }, []);

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

  useEffect(() => {
    fetchLogs();
  }, []);

  const toggleStaffForm = async () => {
    try {
      const newState = !isStaffFormOpen;
      setIsStaffFormOpen(newState);
      await axios.post(
        '/.netlify/functions/toggle-form-status',
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

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortKey === key && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortKey(key);
    setSortDirection(direction);
  };

  const filteredLogs = logs
    .filter((log) => {
      const matchesSearch =
        log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.channel_name.toLowerCase().includes(searchTerm.toLowerCase());
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

  const totalLogs = filteredLogs.length;
  const averageDuration =
    totalLogs > 0
      ? (
          filteredLogs.reduce((sum, log) => sum + parseFloat(log.duration || '0'), 0) /
          totalLogs
        ).toFixed(2)
      : '0';

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

        <div className="bg-white/5 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Logs Over Time</h2>
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>

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
                Export to CSV
              </button>
            </div>
          </div>
          <div className="relative">
            {logsLoading ? (
              <div className="absolute inset-0 flex items-center justify-center text-lg">Loading logs...</div>
            ) : logsError ? (
              <div className="absolute inset-0 flex items-center justify-center text-lg text-red-500">{logsError}</div>
            ) : (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full md:w-1/3 p-3 bg-gray-700 text-white rounded-xl"
                    placeholder="Search logs by username or channel"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full text-center">
                    <thead>
                      <tr>
                        <th
                          className="p-3 cursor-pointer"
                          onClick={() => handleSort('username')}
                        >
                          Username
                        </th>
                        <th
                          className="p-3 cursor-pointer"
                          onClick={() => handleSort('channel_name')}
                        >
                          Channel Name
                        </th>
                        <th
                          className="p-3 cursor-pointer"
                          onClick={() => handleSort('joined_at')}
                        >
                          Joined At
                        </th>
                        <th
                          className="p-3 cursor-pointer"
                          onClick={() => handleSort('left_at')}
                        >
                          Left At
                        </th>
                        <th
                          className="p-3 cursor-pointer"
                          onClick={() => handleSort('duration')}
                        >
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentLogs.map((log, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-700 cursor-pointer"
                          onClick={() => openModal(log)}
                        >
                          <td className="p-3">{log.username}</td>
                          <td className="p-3">{log.channel_name}</td>
                          <td className="p-3">{new Date(log.joined_at).toLocaleString()}</td>
                          <td className="p-3">{new Date(log.left_at).toLocaleString()}</td>
                          <td className="p-3">{log.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between mt-4">
                  <div>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    >
                      Previous
                    </button>
                    <span className="mx-4">{currentPage}</span>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    >
                      Next
                    </button>
                  </div>
                  <div className="text-lg font-semibold">Page {currentPage} of {totalPages}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
