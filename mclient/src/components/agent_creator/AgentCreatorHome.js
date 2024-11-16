import React, { useState, useEffect } from 'react';
import TopNav from '../common/TopNav';
import BottomNav from '../common/BottomNav';

export default function AgentCreatorHome() {

  const [currentAgentView, setCurrentAgentView] = useState('view');

  const setCreateAgent = () => {
    console.log('Create Campaign');
  }
  


  const agentMockupCard = (
    <div>
      <div className='bg-white shadow-md rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-2'>Agent 1</h2>
        <p className='text-gray-700 mb-1'>Agent Type: <span className='font-semibold'>Agent Type 1</span></p>
        <p className='text-gray-700 mb-1'>Total Campaigns: <span className='font-semibold'>123</span></p>
        <p className='text-gray-700'>Total Earnings: <span className='font-semibold'>$456</span></p>
      </div>
    </div>
  )

  let currentViewDisplay = <span />;

  if (currentAgentView === 'view') {
    currentViewDisplay = (
      <div className='mt-16 px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {agentMockupCard}
        {agentMockupCard}
        {agentMockupCard}
      </div>

      <div className='mt-8 flex justify-center'>
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold
         py-3 px-6 rounded-lg shadow-md transition duration-300' onClick={setCreateAgent}>
          Create Agent
        </button>
      </div>
    </div>
    )
  }
  return (
    <div className='min-h-screen bg-gray-100'>
      <TopNav />

      {currentViewDisplay}

      <BottomNav />
    </div>
  );
}