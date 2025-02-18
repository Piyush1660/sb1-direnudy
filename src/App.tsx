import React from 'react';
import {Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WhitelistApplication from './pages/WhitelistApplication';
import RulesPages from "./pages/RulesPage";
import StaffApplication from './pages/StaffApplication';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import RulesPage from "./pages/RulesPage"; // Path to the RulesPage component
import WhitelistingRules from "./pages/WhitelistingRules"; // Path to the WhitelistingRules component
import ServerRules from "./pages/ServerRules"; // Path to the ServerRules component

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/apply" element={<WhitelistApplication />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/staff-application" element={<StaffApplication />} /> 
      <Route path="/AdminLogin" Component={AdminLogin} />
      <Route path="/Dashboard" Component={AdminDashboard} />
      <Route path="/whitelisting-rules" element={<WhitelistingRules />} />
      <Route path="/server-rules" element={<ServerRules />} />
    </Routes>
  );
};

export default App;