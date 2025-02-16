import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const FormStats = () => {
  const socket = io('http://localhost:4000'); // Change to your backend URL
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    socket.on('submissionCount', (count) => setSubmissionCount(count));
    return () => socket.off('submissionCount');
  }, []);

  return (
    <div className="bg-gray-700 p-6 rounded-lg text-white">
      <h2 className="text-2xl font-semibold">Form Submissions</h2>
      <p className="text-4xl font-bold mt-2">{submissionCount}</p>
    </div>
  );
};

export default FormStats;
