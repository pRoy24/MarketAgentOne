import User from '../schema/User.js';
import { getDBConnectionString } from './DBString.js';


export async function loginOrRegisterUser(payload) {
  const { userWorldIdentifier } = payload;
  console.log(payload);
  await getDBConnectionString();

  let userData = await User.findOne({userWorldIdentifier: userWorldIdentifier});

  if (userData) {
    return userData;
  } else {

    userData = new User({
      userWorldIdentifier: userWorldIdentifier,
    });

    await userData.save();

    return userData;
  }
  

}