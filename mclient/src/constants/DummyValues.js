
const IMAGE_BASE = 'https://im-embeddings.s3.us-west-2.amazonaws.com/demo';


  // Define dummy data for active agents and campaigns


  export const dummyActiveAgents = [
    {
      id: 1,
      name: 'Banner Agent',
      image: 'https://via.placeholder.com/150',
      walletAddress: '0x4bEf0221d6F7Dd0C969fe46a4e9b339a84F52FDF',
      userId: 'user_001',
      agentSchema: {
        type: 'ExampleType',
        properties: { key1: 'value1', key2: 'value2' },
      },
      modality: 'Image',
      requestApiUrl: 'https://api.agentA.com/request',
      statusApiUrl: 'https://api.agentA.com/status',
      completionApiUrl: 'https://api.agentA.com/completion',
      apiKey: 'api_key_agentA_123',
      requestApiBody: '{"requestKey":"requestValue"}',
      statusApiBody: '{"statusKey":"statusValue"}',
      completionApiBody: '{"completionKey":"completionValue"}',
      tasksCompleted: 10,
    },
    {
      id: 2,
      name: 'Story Video Agent',
      image: 'https://via.placeholder.com/150',
      walletAddress: '0x6cD7fabc1234Efgh5678Ijkl90Mnopqr1234Stuv',
      userId: 'user_002',
      agentSchema: {
        type: 'AnotherType',
        properties: { keyA: 'valueA', keyB: 'valueB' },
      },
      modality: 'Video',
      requestApiUrl: 'https://api.agentB.com/request',
      statusApiUrl: 'https://api.agentB.com/status',
      completionApiUrl: 'https://api.agentB.com/completion',
      apiKey: 'api_key_agentB_456',
      requestApiBody: '{"requestKey":"requestValue"}',
      statusApiBody: '{"statusKey":"statusValue"}',
      completionApiBody: '{"completionKey":"completionValue"}',
      tasksCompleted: 5,
    },
  ];




  // Define dummy data for active campaigns with all fields from the schema
  export const dummyActiveCampaigns = [
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
      campaignImages: [`${IMAGE_BASE}/canvas_image.png`],
      image: `${IMAGE_BASE}/canvas_image.png`,
      submissions: [
        {
          agentId: 'agent_1',
          mediaLink: 'https://example.com/media1',
          productLink: 'https://example.com/product1',
        },
        {
          agentId: 'agent_2',
          mediaLink: 'https://example.com/media2',
          productLink: 'https://example.com/product2',
        },
      ],
    },
    {
      id: 2,
      userId: 'user_789012',
      walletAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      campaignName: 'Summer Clearance Campaign',
      campaignDescription: 'Clearing out our summer stock at discounted prices.',
      campaignStartDate: new Date('2023-06-01'),
      campaignEndDate: new Date('2023-06-30'),
      campaignStatus: 'active',
      campaignBudget: 2000,
      campaignImages: [`${IMAGE_BASE}/canvas_image (3).png`],
      image: `${IMAGE_BASE}/canvas_image (3).png`,
      submissions: [
        {
          agentId: 'agent_3',
          mediaLink: 'https://example.com/media3',
          productLink: 'https://example.com/product3',
        },
      ],
    },
    {
      id: 3,
      userId: 'user_345678',
      walletAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdef1234',
      campaignName: 'Fall Festival Campaign',
      campaignDescription: 'Promoting our fall festival specials.',
      campaignStartDate: new Date('2023-09-01'),
      campaignEndDate: new Date('2023-09-30'),
      campaignStatus: 'active',
      campaignBudget: 1500,
      campaignImages: [`${IMAGE_BASE}/canvas_image (4).png`],
      image: `${IMAGE_BASE}/canvas_image (4).png`,
      submissions: [],
    },
    // Add more campaigns as needed
  ];


