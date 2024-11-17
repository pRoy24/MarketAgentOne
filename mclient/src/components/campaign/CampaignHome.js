import React from 'react';
import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import TopNav from '../common/TopNav';

// Dummy data for campaigns
const dummyActiveCampaigns = [
  {
    id: 1, // Assuming 'id' is used for navigation and uniqueness
    userId: 'user_123456',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    campaignName: 'Spring Sale Campaign',
    campaignDescription: 'A campaign promoting our spring sale products.',
    campaignStartDate: new Date('2023-03-01'),
    campaignEndDate: new Date('2023-03-31'),
    campaignStatus: 'active',
    campaignBudget: 1000,
    campaignImages: [
      'https://samsar-resources.s3.us-west-2.amazonaws.com/demo/canvas_image.png',
    ],
    image: 'https://samsar-resources.s3.us-west-2.amazonaws.com/demo/canvas_image.png',
    submissions: [
      {
        agentId: 'agent_1',
        agentWalletAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        mediaLink: 'https://example.com/media1',
        productLink: 'https://example.com/product1?referrer=agent_1',
      },
      {
        agentId: 'agent_2',
        agentWalletAddress: '0x1234567890abcdef1234567890abcdef12345678',
        mediaLink: 'https://example.com/media2',
        productLink: 'https://example.com/product1?referrer=agent_2',
      },
    ],
  },
  // Add more campaigns as needed
];

export default function CampaignHome() {
  // For demonstration, we'll use the first campaign in the array
  const campaign = dummyActiveCampaigns[0];

  return (
    <div className="bg-gray-800 text-white min-h-screen p-8">
      <TopNav />
      <div className="max-w-3xl mx-auto mt-[55px]">
        {/* Campaign Name */}
        <h1 className="text-4xl font-bold mb-4">{campaign.campaignName}</h1>

        {/* Campaign Creator's Wallet Address and Avatar */}
        <div className="flex items-center mb-6">
          <Identity
            address={campaign.walletAddress}
            schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
            chain={base}
          >
            <Avatar className="w-12 h-12 mr-4" />
            <div>
              <Name className="text-xl font-semibold">
                <Badge />
              </Name>
              <Address className="text-gray-400" />
            </div>
          </Identity>
        </div>

        {/* Campaign Images */}
        <div className="mb-6">
          {campaign.campaignImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Campaign Image ${index + 1}`}
              className="w-full h-64 object-cover rounded mb-4"
            />
          ))}
        </div>

        {/* Campaign Details */}
        <div className="mb-8">
          <p className="text-lg mb-4">{campaign.campaignDescription}</p>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Budget:</span> ${campaign.campaignBudget}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {campaign.campaignStatus}
            </p>
            <p>
              <span className="font-semibold">Start Date:</span>{' '}
              {campaign.campaignStartDate.toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">End Date:</span>{' '}
              {campaign.campaignEndDate.toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Submissions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Submissions</h2>
          {campaign.submissions.length > 0 ? (
            <div className="space-y-6">
              {campaign.submissions.map((submission, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded">
                  {/* Agent's Wallet Address and Avatar */}
                  <div className="flex items-center mb-2">
                    <Identity
                      address={submission.agentWalletAddress}
                      chain={base}
                    >
                      <Avatar className="w-10 h-10 mr-4" />
                      <div>
                        <Name className="text-lg font-semibold">
                          <Badge />
                        </Name>
                        <Address className="text-gray-400" />
                      </div>
                    </Identity>
                  </div>
                  {/* Submission Links */}
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Media Link:</span>{' '}
                      <a
                        href={submission.mediaLink}
                        className="text-blue-400 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {submission.mediaLink}
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold">Product Link:</span>{' '}
                      <a
                        href={submission.productLink}
                        className="text-blue-400 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {submission.productLink}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No submissions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}