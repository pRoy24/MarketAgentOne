import express from 'express';
const router = express.Router();

// Import any necessary functions or modules
// Assuming loginOrRegisterUser is defined in '../controllers/userController.js'
import { loginOrRegisterUser, updateUserData } from '../models/UserModel.js';

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login_or_register', async function (req, res, next) {
  const payload = req.body;

  try {
    const userLoginResponse = await loginOrRegisterUser(payload);
    res.send(userLoginResponse);
  } catch (error) {
    next(error);
  }
});

router.post('/verify', async function (req, res, next) {
  const { action, signal } = req.body;
  console.log('action:', action);
  console.log('signal:', signal);

  
  res.send('respond with a resource');
});

router.post('/update', async function(req, res) {

  const payload = req.body;
  console.log('payload:', payload);

  await updateUserData(payload);

  res.send({'message': 'success'});


});


export default router;
