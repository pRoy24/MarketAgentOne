
import { Schema,model } from 'mongoose';
// 2. Create a Schema corresponding to the document interface.
const campaignSchema = new Schema({


  userId: String,
  walletAddress: String,
  campaignName: String,
  campaignDescription: String,
  campaignStartDate: Date,
  campaignEndDate: Date,
  campaignStatus: String, 
  campaignBudget: Number,

  campaignImages: [String],
  
  

}, { timestamps: true, strict: false });

// 3. Create a Model.
const User = model('Campaign', campaignSchema);

export default Campaign;
