import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { MessageSquare, Github, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import WhitelistApplication from './pages/WhitelistApplication';
import RulesPage from './pages/RulesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/apply" element={<WhitelistApplication />} />
      <Route path="/rules" element={<Rulespage />} />
    </Routes>
  );
}

export default App;