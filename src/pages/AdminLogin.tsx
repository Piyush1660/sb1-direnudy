import React, { useState } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/.netlify/functions/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.success) {
      window.location.href = "/dashboard";
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white py-20">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="max-w-lg mx-auto bg-white/5 p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-center">
            Admin Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-lg font-semibold transition-all"
              >
                <Lock className="w-5 h-5" />
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
