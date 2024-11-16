import User from '../schema/User.js';
import { getDBConnectionString } from './DBString.js';

import { verifyAuthToken, generateAuthToken } from './Auth.js';

import { ethers } from 'ethers';




export async function loginOrRegisterUser(payload) {


  const { userWorldIdentifier } = payload;

  await getDBConnectionString();

  let userData = await User.findOne({ userWorldIdentifier: userWorldIdentifier });



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

export async function updateUserData(userId, payload) {

  await getDBConnectionString();

  if (payload && payload.walletAddress) {
    const { walletAddress } = payload;
    const normalizedWalletAddress = ethers.getAddress(walletAddress);
    payload.walletAddress = normalizedWalletAddress;
  }
  const userUpdatedData = await User.findOneAndUpdate({ _id: userId }, payload);
  return userUpdatedData;
}

export async function verifyUserAuth(requestHeaders) {


  await getDBConnectionString();

  let userToken;
  try {
    userToken = requestHeaders.authorization.split("Bearer ")[1];
  } catch (e) {
    return null;
  }
  if (!userToken) {
    return null;
  }



  const decodedData = verifyAuthToken(userToken);


  const userId = decodedData._id.toString();


  let userData = await User.findById(userId);



  if (userData) {
    return userData._id;
  } else {
    return null;
  }
}

export async function getUserDataById(userId) {
  await getDBConnectionString();



  let userData = await User.findById(userId);

  return userData._doc;
}