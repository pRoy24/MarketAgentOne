import React from 'react';
import TopNav from '../common/TopNav';
import BottomNav from '../common/BottomNav';

export default function MerchantHome() {

  const setCreateCampaign = () => {
    console.log('Create Campaign');
  }
  
  const campaignMockupCard = (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <h2 className='text-xl font-semibold mb-2'>Campaign 1</h2>
      <p className='text-gray-700 mb-1'>Product 1</p>
      <p className='text-red-600 font-medium mb-1'>Campaign Ended</p>
      <p className='text-gray-700 mb-1'>Total Conversions: <span className='font-semibold'>123</span></p>
      <p className='text-gray-700'>Total Payouts: <span className='font-semibold'>$456</span></p>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-100'>
      <TopNav />

      <div className='mt-16 px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {campaignMockupCard}
          {campaignMockupCard}
          {campaignMockupCard}
        </div>

        <div className='mt-8 flex justify-center'>
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold
           py-3 px-6 rounded-lg shadow-md transition duration-300' onClick={setCreateCampaign}>
            Create Campaign
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}