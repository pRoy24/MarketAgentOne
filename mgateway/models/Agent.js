export async function createNewAgentForUser(userId, payload) {
  console.log(payload);
  
  const { agentName, agentType, agentDescription , walletAddress} = payload;
  await getDBConnectionString();
  const newAgent = new Agent({
    agentName,
    agentType,
    agentDescription,
    userId,
    walletAddress
  });
  await newAgent.save();
  return newAgent;
}
