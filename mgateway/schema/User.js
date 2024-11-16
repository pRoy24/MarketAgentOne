
import { Schema,model } from 'mongoose';
// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema({

  userId: String,

  userWorldIdentifier: String,

  userType: String,  // marketer or producer

  userOnboardingCompleted: { type: Boolean, default: false },


}, { timestamps: true });

// 3. Create a Model.
const User = model('User', userSchema);

export default User;
