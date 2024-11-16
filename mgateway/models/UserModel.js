import User from '../schema/User.js';
import { getDBConnectionString } from './DBString.js';

import { verifyAuthToken } from './Auth.js';

export async function loginOrRegisterUser(payload) {
  const { userWorldIdentifier } = payload;

  await getDBConnectionString();

  let userData = await User.findOne({userWorldIdentifier: userWorldIdentifier});

  if (userData) {
    const authToken = generateAuthToken(userData._id);
    let returnUserPayload = Object.assign({}, userData._doc, { authToken });
    return returnUserPayload;
  } else {

    userData = new User({
      userWorldIdentifier: userWorldIdentifier,
    });

    await userData.save();

    const authToken = generateAuthToken(userData._id);
    let returnUserPayload = Object.assign({}, userData._doc, { authToken });

    return returnUserPayload;
  }
  

}

export async function updateUserData(payload) {

  await getDBConnectionString();


  console.log(payload);
  console.log("EEMEME");

  const userUpdatedData = await updateUserData(payload);


  return;

}

export async function verifyUserToken(userToken) {
  const decodedData = verifyAuthToken(userToken);
  const userId = decodedData._id;
  await getDBConnectionString();
  
  let userData = await User.findOne({ _id: userId });

  if (userData) {
  return userData._id;
  } else {
    return null;
  }
}