import React from 'react';
import {Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WhitelistApplication from './pages/WhitelistApplication';
import RulesPages from "./pages/RulesPage";
import StaffApplication from './pages/StaffApplication';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import RulesPage from "./components/RulesPage"; // Path to the RulesPage component
import WhitelistingRules from "./components/WhitelistingRules"; // Path to the WhitelistingRules component
import ServerRules from "./components/ServerRules"; // Path to the ServerRules component
import RoleplayRules from "./components/RoleplayRules"; // Path to the ServerRules component
import StaffLogin from './pages/StaffLogin';
import StaffDashboard from './pages/StaffDashboard';
import StaffLoaForm from "./pages/StaffLoaForm";

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
      <Route path="/Roleplay-rules" element={<RoleplayRules />} />
      <Route path="/staff-login" Component={StaffLogin} />
      <Route path="/staff-dashboard" element={<StaffDashboard />} />
      <Route path="/staff-loa" element={<StaffLoaForm />} />
    </Routes>
  );
};

export default App;