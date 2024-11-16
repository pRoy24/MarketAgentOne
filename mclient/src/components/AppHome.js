import React from 'react';
import TopNav from './common/TopNav';
import BottomNav from './common/BottomNav';

import { IDKitWidget } from '@worldcoin/idkit'



function AppHome() {

  const onLoginSuccess = () => {
    alert('Verification successful!')
    axios.post(`${GATEWAY_SERVER}/`)  
  }

  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex-grow overflow-auto bg-white text-gray-800 mt-16 mb-16">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to MarketingOne Mini App</h1>


          <IDKitWidget
            app_id="app_staging_c2acc643b97e88403c9c2bf00755c8dd" // obtained from the Developer Portal
            action="login-with-worldid" // this is your action name from the Developer Portal
            signal="user_login" // any arbitrary value the user is committing to, e.g. a vote
            onSuccess={onLoginSuccess}
            verification_level="device" // minimum verification level accepted, defaults to "orb"
          >
            {({ open }) => <button onClick={open}>Verify with World ID</button>}
          </IDKitWidget>

          {/* Add your main content here */}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default AppHome;