import React, { useEffect, useState } from 'react';
import TopNav from './common/TopNav';
import BottomNav from './common/BottomNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IDKitWidget } from '@worldcoin/idkit'
import { getHeaders } from '../utils/WebUtils.js';

import {useUser} from '../contexts/UserContext.js';

const GATEWAY_SERVER = process.env.REACT_APP_GATEWAY_SERVER;


function AppHome() {

  const [showOnboardingFlow, setShowOnboardingFlow] = useState(false);

  const navigate = useNavigate();


  const { user, setUser } = useUser();

  useEffect(() => {

    if (user) {
      console.log("USER");
      console.log(user);
      if (!user.userOnboardingCompleted) {
        setShowOnboardingFlow(true);
      } else {
        if (user.userType === 'agentCreator') {
          navigate("/agent_creator_home");
        } else if (user.userType === 'merchant') {
          navigate("/merchant_home");
        }
      }
    }
    
  }, [user]);

  useEffect(() => {
    // navigate('/onboarding');

    if (showOnboardingFlow) {
     // navigate('/onboarding');
    }

  }, [showOnboardingFlow]);


  useEffect(() => {


  }, []);


  useEffect(() => {

    if (localStorage.getItem('authToken')) {

      const headers = getHeaders();

      axios.get(`${GATEWAY_SERVER}/users/verify`, headers).then((res) => {
        if (res.status === 200) {
          const userData = res.data;

          setUser(userData);
          if (!userData.userOnboardingCompleted) {
            navigate('/onboarding');
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);

  const onLoginSuccess = async (data) => {

    console.log("LOGIN SUCCESS");
    console.log(data);




    const userWorldIdentifier = data.nullifier_hash;

    const payload = {
      userWorldIdentifier: userWorldIdentifier
    };

    const loginRes = await axios.post(`${GATEWAY_SERVER}/users/login_or_register`, payload);

    if (loginRes.status === 200) {

      const userData = loginRes.data;

      const authToken = userData.authToken;


      localStorage.setItem('authToken', authToken);

      if (userData && !userData.userOnboardingCompleted) {
        navigate('/onboarding');
      }

    }
  }



  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex-grow overflow-auto bg-white text-gray-800 mt-16 mb-16">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to MarketingOne Dashboard</h1>


          <IDKitWidget
            app_id="app_staging_c2acc643b97e88403c9c2bf00755c8dd" // obtained from the Developer Portal
            action="login-with-worldid" // this is your action name from the Developer Portal
            signal="user_login" // any arbitrary value the user is committing to, e.g. a vote
            onSuccess={onLoginSuccess}
            verification_level="device" // minimum verification level accepted, defaults to "orb"
          >
            {({ open }) => <button onClick={open}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >Login with World ID</button>}
          </IDKitWidget>

          {/* Add your main content here */}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default AppHome;