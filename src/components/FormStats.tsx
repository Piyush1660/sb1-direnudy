import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormStats = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await axios.get('/.netlify/functions/form-stats');
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="bg-white/10 p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Form Stats</h2>
      <p><strong>Total Submissions:</strong> {stats.totalSubmissions}</p>
      <p><strong>Approved:</strong> {stats.approved}</p>
      <p><strong>Pending:</strong> {stats.pending}</p>
      <p><strong>Rejected:</strong> {stats.rejected}</p>
    </div>
  );
};

export default FormStats;
