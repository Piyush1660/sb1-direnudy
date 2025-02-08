import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageSquare, Github, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import WhitelistApplication from './pages/WhitelistApplication';
import RulesPage from "./pages/RulesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/apply" element={<WhitelistApplication />} />
      <Route path="/rules" element={<RulesPage />} />
    </Routes>
  );
}

export default App;