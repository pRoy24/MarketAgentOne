import React, { useEffect, useState } from 'react';
import TopNav from './common/TopNav';
import BottomNav from './common/BottomNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IDKitWidget } from '@worldcoin/idkit';
import { getHeaders } from '../utils/WebUtils.js';

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

  // Define dummy data for active agents and campaigns
  const dummyActiveAgents = [
    { id: 1, name: 'Agent A', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Agent B', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Agent C', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Agent D', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Agent E', image: 'https://via.placeholder.com/150' },
  ];

  const dummyActiveCampaigns = [
    { id: 1, title: 'Campaign 1', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Campaign 2', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Campaign 3', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Campaign 4', image: 'https://via.placeholder.com/150' },
    { id: 5, title: 'Campaign 5', image: 'https://via.placeholder.com/150' },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
  };

  // Create the displays using the Slider component
  const activeAgentsListDisplay = (
    <Slider {...settings}>
      {dummyActiveAgents.map(agent => (
        <div key={agent.id} className="px-2">
          <div className="bg-white rounded-lg shadow-md dark:bg-gray-800">
            <img src={agent.image} alt={agent.name} className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{agent.name}</h3>
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
          <div className="bg-white rounded-lg shadow-md dark:bg-gray-800">
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
          5 Active Campaigns
        </div>
        <div className="w-full">
          {activeCampaignsListDisplay}
        </div>
      </div>
      <div>
        <div className='text-2xl font-bold text-gray-800 dark:text-white mb-4'>
          5 Active Agents
        </div>
        <div>
          {activeAgentsListDisplay}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-auto bg-gray-100 dark:bg-gray-800">
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
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
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