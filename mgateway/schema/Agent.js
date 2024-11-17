
import { Schema,model } from 'mongoose';
// 2. Create a Schema corresponding to the document interface.
const agentSchema = new Schema({


  userId: String,
  agentSchema: Object,
  requestApiUrl: String,
  statusApiUrl: String,
  completionApiUrl: String,
  apiKey: String,
  requestApiBody: String,
  statusApiBody: String,
  completionApiBody: String,
  
  walletAddress: String,


  

}, { timestamps: true, strict: false });

// 3. Create a Model.
const Agent = model('Agent', agentSchema);

export default Agent;
