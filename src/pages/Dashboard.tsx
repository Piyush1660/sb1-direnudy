import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, ClipboardList, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Application {
  id: string;
  type: 'Staff' | 'Whitelist';
  discordId: string;
  age?: number;
  timezone?: string;
  reason: string;
  strengths?: string;
  additionalInfo?: string;
  interviewTiming?: string;
}

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/.netlify/functions/getApplications');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white py-20">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-center">
          Admin Dashboard
        </h1>

        <div className="bg-white/5 p-6 rounded-xl shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <ClipboardList /> Applications Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-white/10 p-4 rounded-lg border border-gray-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-purple-300 flex items-center gap-2">
                    {app.type === 'Staff' ? <User /> : <CheckSquare />} {app.type} Application
                  </h3>
                  <span className="text-sm text-gray-400">#{app.id}</span>
                </div>
                <p><strong>Discord ID:</strong> {app.discordId}</p>
                {app.age && <p><strong>Age:</strong> {app.age}</p>}
                {app.timezone && <p><strong>Timezone:</strong> {app.timezone}</p>}
                <p><strong>Reason:</strong> {app.reason}</p>
                {app.strengths && <p><strong>Strengths:</strong> {app.strengths}</p>}
                {app.interviewTiming && <p><strong>Interview Timing:</strong> {app.interviewTiming}</p>}
                {app.additionalInfo && <p><strong>Additional Info:</strong> {app.additionalInfo}</p>}

                <div className="flex gap-2 mt-4">
                  <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                    Approve
                  </button>
                  <button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
