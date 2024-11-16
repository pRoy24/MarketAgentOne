
import { Schema,model } from 'mongoose';
// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema({


  userWorldIdentifier: String,

  userType: String,  // marketer or producer

  userOnboardingCompleted: { type: Boolean, default: false },

  walletAddress: String,
  

}, { timestamps: true, strict: false });

// 3. Create a Model.
const User = model('User', userSchema);

export default User;
