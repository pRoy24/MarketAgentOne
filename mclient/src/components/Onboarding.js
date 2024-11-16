import React , { useState, useEffect } from 'react';
import TopNav from './common/TopNav';
import BottomNav from './common/BottomNav';

import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity';


export default function Onbooarding() {
  return (


    <div className="flex flex-col h-screen">
    <TopNav />
    <div className="flex-grow overflow-auto bg-white text-gray-800 mt-16 mb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to MarketingOne Mini App</h1>


  
        <div>
      <h1>Onboarding</h1>
      <Identity>
        <Avatar />
        <Name />
        <Badge />
        <Address />
      </Identity>
    </div>


        {/* Add your main content here */}
      </div>
    </div>
    <BottomNav />
  </div>


  )
}