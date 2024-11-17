import React, { useEffect, useState } from 'react';
import TopNav from './common/TopNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IDKitWidget } from '@worldcoin/idkit';
import { getHeaders } from '../utils/WebUtils.js';
import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity';
import { dummyActiveAgents, dummyActiveCampaigns } from '../constants/DummyValues.js';

import { base } from 'viem/chains';

import { useUser } from '../contexts/UserContext.js';

import Slider from 'react-slick';  // Import Slider from react-slick

import 'slick-carousel/slick/slick.css';               // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css';

const GATEWAY_SERVER = process.env.REACT_APP_GATEWAY_SERVER;

function AppHome() {

  const [showOnboardingFlow, setShowOnboardingFlow] = useState(false);

  const navigate = useNavigate();

  const { user, setUser } = useUser();

  useEffect(() => {

    if (user) {

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
    if (showOnboardingFlow) {
      navigate('/onboarding');
    }

  }, [showOnboardingFlow]);

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
  };


  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
  };


  const agentSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
  };


  // Create the displays using the Slider component
  const activeAgentsListDisplay = (
    <Slider {...agentSliderSettings}>
      {dummyActiveAgents.map((agent) => (
        <div key={agent.id} className="px-2">
          <div
            onClick={() => navigate(`/agent/${agent.id}`)}
            className="cursor-pointer bg-white rounded-lg shadow-md dark:bg-gray-800"
          >


            {/* Agent Details */}
            <div className="p-4">
              {/* Agent's Wallet Address and Name using OnChainKit */}
              <div className="flex items-center mb-4 text-white">
                <Identity address={agent.walletAddress} chain={base}>
                  <div>

                    <Address className="text-gray-500 dark:text-gray-400"/>
                  </div>
                </Identity>
              </div>

              <div>
                {agent.name}
              </div>
              <div>
               Generation Type: {agent.modality}
              </div>
              <div>
                {agent.status}

              </div>
              <div> 

               Tasks Completed: {agent.tasksCompleted}

               </div>   
              {/* Similarly for statusApiBody and completionApiBody */}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );


  const activeCampaignsListDisplay = (
    <Slider {...settings}>
      {dummyActiveCampaigns.map(campaign => (
        <div key={campaign.id} className="px-2">
          <div
            onClick={() => navigate(`/campaign/${campaign.id}`)}
            className="cursor-pointer bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <img src={campaign.image} alt={campaign.title} className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{campaign.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );



  const landingPageContent = (
    <div className="space-y-8">
      <div>
        <div className='text-2xl font-bold text-gray-800 dark:text-white mb-4'>
          3 Active Campaigns
        </div>
        <div className="w-full">
          {activeCampaignsListDisplay}
        </div>
      </div>
      <div>
        <div className='text-2xl font-bold text-gray-800 dark:text-white mb-4'>
          2 Active Agents
        </div>
        <div>
          {activeAgentsListDisplay}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-auto bg-gray-100 dark:bg-gray-800 min-h-[100vh]">
      <TopNav />
      <div className="flex-grow overflow-auto bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white mt-16 mb-16">
        <div className="p-4">

          {landingPageContent}

          <div className="mt-8 flex justify-center">
            <IDKitWidget
              app_id="app_staging_c2acc643b97e88403c9c2bf00755c8dd" // obtained from the Developer Portal
              action="login-with-worldid" // this is your action name from the Developer Portal
              signal="user_login" // any arbitrary value the user is committing to, e.g. a vote
              onSuccess={onLoginSuccess}
              verification_level="device" // minimum verification level accepted, defaults to "orb"
            >
              {({ open }) => <button onClick={open}
                className='bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-4 px-4 rounded border
                 border-neutral-500 rounded mt-2'
              >Login with World ID</button>}
            </IDKitWidget>
          </div>

          {/* Add your main content here */}
        </div>
      </div>

    </div>
  );
}

export default AppHome;