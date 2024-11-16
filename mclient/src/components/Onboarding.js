import React, { useState } from 'react';
import TopNav from './common/TopNav';
import BottomNav from './common/BottomNav';

import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState(null); // 'agentCreator' or 'merchant'

  // For Agent Creator
  const [agentType, setAgentType] = useState(null); // 'dalle3Banner', 'samsarOne', 'customAgent'

  const [apiUrl, setApiUrl] = useState('');
  const [inputSchema, setInputSchema] = useState('');
  const [outputSchema, setOutputSchema] = useState('');

  // For Merchant
  const [productImages, setProductImages] = useState([]);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  // Function to handle next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to handle previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Function to handle submit
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted');
    nextStep();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <TopNav />
      <div className="flex-grow overflow-auto bg-gray-900 text-gray-100 mt-16 mb-16">
        <div className="p-4 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Welcome to MarketingAgentOne</h1>

          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Are you an Agent Creator or a Merchant?</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setUserType('agentCreator');
                    nextStep();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Agent Creator
                </button>
                <button
                  onClick={() => {
                    setUserType('merchant');
                    nextStep();
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Merchant
                </button>
              </div>
            </div>
          )}

          {/* Agent Creator Flow */}
          {userType === 'agentCreator' && (
            <>
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Deploy your first agent</h2>
                  <div className="flex flex-col space-y-4">
                    <button
                      onClick={() => {
                        setAgentType('dalle3Banner');
                        handleSubmit();
                      }}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Dalle3Banner agent
                    </button>
                    <button
                      onClick={() => {
                        setAgentType('samsarOne');
                        handleSubmit();
                      }}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                      SamsarOne agent
                    </button>
                    <button
                      onClick={() => {
                        setAgentType('customAgent');
                        nextStep();
                      }}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Custom agent
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && agentType === 'customAgent' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Configure your Custom Agent</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">API URL</label>
                      <input
                        type="text"
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Input Schema</label>
                      <textarea
                        value={inputSchema}
                        onChange={(e) => setInputSchema(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Output Schema</label>
                      <textarea
                        value={outputSchema}
                        onChange={(e) => setOutputSchema(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={prevStep}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Merchant Flow */}
          {userType === 'merchant' && (
            <>
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Add Product Listing</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Product Images</label>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          setProductImages([...e.target.files]);
                        }}
                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={prevStep}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Previous
                      </button>
                      <button
                        onClick={nextStep}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Add Budget</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Budget</label>
                      <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={prevStep}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Confirmation Message */}
          {currentStep > 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Thank you!</h2>
              <p>Your information has been submitted successfully.</p>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}