import express from 'express';
const router = express.Router();
import { verifyUserAuth , getUserDataById} from '../models/UserModel.js';

// Import any necessary functions or modules
// Assuming loginOrRegisterUser is defined in '../controllers/userController.js'
import { loginOrRegisterUser, updateUserData } from '../models/UserModel.js';

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login_or_register', async function (req, res) {

  const payload = req.body;

 
  try {
    const userLoginResponse = await loginOrRegisterUser(payload);
    res.send(userLoginResponse);
  } catch (error) {
    console.log(error);

    res.status(500).send({ 'message': 'Error' });
  }
});

router.get('/verify', async function (req, res) {

  const headers = req.headers;
  const userId = await verifyUserAuth(headers);

  if (!userId) {
    res.status(401).send({ 'message': 'Unauthorized' });
  }

  const userData = await getUserDataById(userId);
  res.send(userData);


});

router.post('/update', async function(req, res) {

  const payload = req.body;
  const headers = req.headers;
  const userId = await verifyUserAuth(headers);

  if (!userId) {
    res.status(401).send({'message': 'Unauthorized'});
  }
  await updateUserData(userId, payload);

  res.send({'message': 'success'});
});


export default router;
