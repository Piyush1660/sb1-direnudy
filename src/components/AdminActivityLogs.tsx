import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminActivityLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await axios.get('/.netlify/functions/admin-activity-logs');
      setLogs(data);
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-white/10 p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Activity Logs </h2>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="text-white/80">
            {log.activity} - <span className="text-sm text-gray-400">{new Date(log.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminActivityLogs;
