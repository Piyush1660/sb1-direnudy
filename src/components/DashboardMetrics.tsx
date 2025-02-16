import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DashboardMetrics = () => {
  const data = {
    labels: ['Accepted', 'Rejected', 'Pending'],
    datasets: [{
      data: [10, 5, 2], // Fetch actual data from your API
      backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
    }]
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg text-white">
      <h2 className="text-2xl font-semibold mb-4">Application Metrics</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default DashboardMetrics;
