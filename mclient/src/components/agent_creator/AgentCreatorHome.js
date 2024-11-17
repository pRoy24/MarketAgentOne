import React, { useState } from 'react';
import TopNav from '../common/TopNav';
import BottomNav from '../common/BottomNav';

export default function AgentCreatorHome() {
  const [currentAgentView, setCurrentAgentView] = useState('view');

  // State hooks for form inputs
  const [requestApiUrl, setRequestApiUrl] = useState('');
  const [statusApiUrl, setStatusApiUrl] = useState('');
  const [completionApiUrl, setCompletionApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [requestApiBody, setRequestApiBody] = useState('');
  const [statusApiBody, setStatusApiBody] = useState('');
  const [completionApiBody, setCompletionApiBody] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentType, setAgentType] = useState('');
  const [outputModality, setOutputModality] = useState('');

  const setCreateAgent = () => {
    console.log('Create Agent');
    setCurrentAgentView('create');
  };

  const createNewAgent = () => {
    const payload = {
      requestApiUrl,
      statusApiUrl,
      completionApiUrl,
      apiKey,
      requestApiBody,
      statusApiBody,
      completionApiBody,
      walletAddress,
      agentName,
      agentType,
      outputModality,
    };

    console.log('Creating new agent with payload:', payload);

    // Here, you would typically make an API call to your backend to create the agent
    fetch('/api/agents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        // Handle success, perhaps navigate back to the 'view' page
        console.log('Agent created:', data);
        setCurrentAgentView('view');
      })
      .catch(error => {
        // Handle error
        console.error('Error creating agent:', error);
      });
  };

  const agentMockupCard = (
    <div>
      <div className='bg-white shadow-md rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-2'>Agent 1</h2>
        <p className='text-gray-700 mb-1'>
          Agent Type: <span className='font-semibold'>Agent Type 1</span>
        </p>
        <p className='text-gray-700 mb-1'>
          Total Campaigns: <span className='font-semibold'>123</span>
        </p>
        <p className='text-gray-700'>
          Total Earnings: <span className='font-semibold'>$456</span>
        </p>
      </div>
    </div>
  );

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
          <button
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300'
            onClick={setCreateAgent}
          >
            Create Agent
          </button>
        </div>
      </div>
    );
  } else if (currentAgentView === 'create') {
    currentViewDisplay = (
      <div className='mt-16 w-[512px] m-auto px-4 mb-16'>
        <h2 className='text-xl font-semibold mb-4'>Configure a New Agent</h2>
        <div className='bg-white shadow-md rounded-lg p-6'>
          <div className='mb-4'>
            <label className='block text-gray-700'>Agent Name</label>
            <input
              type='text'
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Agent Type</label>
            <input
              type='text'
              value={agentType}
              onChange={(e) => setAgentType(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Output Modality</label>
            <select
              value={outputModality}
              onChange={(e) => setOutputModality(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            >
              <option value=''>Select Output Modality</option>
              <option value='Image'>Image</option>
              <option value='Text'>Text</option>
              <option value='Video'>Video</option>
              <option value='Audio'>Audio</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Request API URL</label>
            <input
              type='text'
              value={requestApiUrl}
              onChange={(e) => setRequestApiUrl(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Status API URL</label>
            <input
              type='text'
              value={statusApiUrl}
              onChange={(e) => setStatusApiUrl(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Completion API URL</label>
            <input
              type='text'
              value={completionApiUrl}
              onChange={(e) => setCompletionApiUrl(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>API Key</label>
            <input
              type='text'
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Request API Body</label>
            <textarea
              value={requestApiBody}
              onChange={(e) => setRequestApiBody(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            ></textarea>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Status API Body</label>
            <textarea
              value={statusApiBody}
              onChange={(e) => setStatusApiBody(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            ></textarea>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Completion API Body</label>
            <textarea
              value={completionApiBody}
              onChange={(e) => setCompletionApiBody(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            ></textarea>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Wallet Address</label>
            <input
              type='text'
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            />
          </div>

          <div className='mt-8 flex justify-center'>
            <button
              onClick={createNewAgent}
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300'
            >
              Create Agent
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <TopNav />

      {currentViewDisplay}


    </div>
  );
}