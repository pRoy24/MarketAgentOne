// src/components/Onboarding.js

import React, { useState } from 'react';
import TopNav from './common/TopNav';
import BottomNav from './common/BottomNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WalletPreview from './onboard_wizard/WalletPreview';
import { getHeaders } from '../utils/WebUtils';

// Import the new AddStore component
import AddStore from './onboard_wizard/AddStore';

import AddAgent from './onboard_wizard/AddAgent';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState(null); // 'agentCreator' or 'merchant'

  // For both types
  const [walletAddress, setWalletAddress] = useState('');
  const [avatar, setAvatar] = useState(null);

  // For Agent Creator
  const [agentType, setAgentType] = useState(null); // 'dalle3Banner', 'samsarOne', 'customAgent'
  const [apiUrl, setApiUrl] = useState('');
  const [inputSchema, setInputSchema] = useState('');
  const [outputSchema, setOutputSchema] = useState('');

  // For Merchant
  const [merchantStoreLink, setMerchantStoreLink] = useState('');
  const [budget, setBudget] = useState('');

  // API Server URL
  const API_SERVER = process.env.REACT_APP_GATEWAY_SERVER; // Replace with your actual API server URL

  // Function to update user details on the server
  const updateUserDetails = async (payload) => {
    try {
      const hasFile = payload.avatar;
      let data = payload;
      let headers = getHeaders();

      if (hasFile) {
        const formData = new FormData();
        for (const key in payload) {
          if (payload[key] instanceof File || payload[key] instanceof Blob) {
            formData.append(key, payload[key]);
          } else {
            formData.append(key, payload[key]);
          }
        }
        data = formData;
      }

      const response = await axios.post(`${API_SERVER}/users/update`, data, headers);

      console.log('User details updated:', response.data);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

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
    // You can perform any final submission logic here
    console.log('Form submitted');
    nextStep();
  };

  return (

    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
    <TopNav />
    <div className="flex-grow overflow-auto bg-gray-900 text-gray-100 mt-16 mb-16">
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome to MarketingAgentOne</h1>

        {/* Step 1: User Type Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Are you an Agent Creator or a Merchant?</h2>
            {/* User type selection buttons */}
          </div>
        )}

        {/* Step 2: Add Wallet */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Wallet</h2>
            {/* Wallet input and preview */}
          </div>
        )}

        {/* Agent Creator Flow */}
        {userType === 'agentCreator' && (
          <>
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Deploy your first agent</h2>
                {/* Agent selection buttons */}
              </div>
            )}
            {currentStep === 4 && agentType === 'customAgent' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Configure your Custom Agent</h2>
                {/* Custom agent configuration inputs */}
              </div>
            )}
          </>
        )}

        {/* Merchant Flow */}
        {userType === 'merchant' && (
          <>
            {currentStep === 3 && (
              <AddStore
                nextStep={nextStep}
                prevStep={prevStep}
                setMerchantStoreLink={setMerchantStoreLink}
              />
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Add Budget</h2>
                <div className="space-y-4">
                  {/* Budget Input */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Budget</label>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white"
                    />
                  </div>
                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={prevStep}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Previous
                    </button>
                    <button
                      onClick={async () => {
                        const payload = {
                          userType,
                          merchantStoreLink,
                          budget,
                          userOnboardingCompleted: true, // Set onboarding completed
                        };
                        await updateUserDetails(payload);
                        handleSubmit();
                      }}
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
      </div>
    </div>
    <BottomNav />
  </div>
  
  );
}