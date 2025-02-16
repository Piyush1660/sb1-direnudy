import React from 'react';
import {Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WhitelistApplication from './pages/WhitelistApplication';
import RulesPage from "./pages/RulesPage";
import StaffApplication from './pages/StaffApplication';
import AdminLogin from './pages/AdminLogin';


function App() {
  return (
    
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/apply" element={<WhitelistApplication />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/staff-application" element={<StaffApplication />} />
      <Route path="/AdminLogin" Component={AdminLogin} />
    </Routes>
  );
};

export default App;