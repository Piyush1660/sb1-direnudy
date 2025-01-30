import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

function RulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Server Rules
      </h1>
      <p className="text-lg text-gray-300 mt-4 max-w-2xl text-center">
        Please follow the rules below to ensure a fun and fair experience for everyone.
      </p>

      <div className="mt-8 bg-white/10 p-6 rounded-xl max-w-3xl w-full">
        <ul className="list-decimal list-inside text-gray-300 space-y-3">
          <li>No cheating, hacking, or exploiting bugs.</li>
          <li>Respect all players and staff members.</li>
          <li>Roleplay must be taken seriously; no random killings.</li>
          <li>Do not use out-of-character (OOC) information in roleplay.</li>
          <li>No offensive or discriminatory language.</li>
          <li>Follow all server economy rules and guidelines.</li>
        </ul>
      </div>

      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-lg font-semibold transition-all"
        >
          <AlertCircle className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default RulesPage;
