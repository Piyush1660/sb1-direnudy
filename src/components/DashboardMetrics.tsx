import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const DashboardMetrics = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data } = await axios.get('/.netlify/functions/form-stats');
      setData(data);
    };
    fetchMetrics();
  }, []);

  const chartData = {
    labels: ['Total', 'Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        label: 'Submissions',
        data: data ? [data.totalSubmissions, data.approved, data.pending, data.rejected] : [0, 0, 0, 0],
        backgroundColor: ['#8b5cf6', '#22c55e', '#eab308', '#ef4444'],
      },
    ],
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Metrics</h2>
      {data ? <Bar data={chartData} /> : <p>Loading metrics...</p>}
    </div>
  );
};

export default DashboardMetrics;
