// App.js
import React from 'react';
import './App.css';
import AppHome from './components/AppHome';
import Onboarding from './components/Onboarding';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MerchantHome from './components/merchant/MerchantHome';
import AgentCreatorHome from './components/agent_creator/AgentCreatorHome';
import CampaignHome from './components/campaign/CampaignHome';
import AgentHome from './components/agent/AgentHome';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/agent_creator_home" element={<AgentCreatorHome />} />
          <Route path="/merchant_home" element={<MerchantHome />} />
          <Route path="/campaign/:id" element={<CampaignHome />} />
          <Route path="/agent/:id" element={<AgentHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;