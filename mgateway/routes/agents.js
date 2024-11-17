import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/create', async function (req, res) {  
  const payload = req.body;

  const agentCreateResponse = await createNewAgentForUser(userId, payload);

  res.json(agentCreateResponse);
});


export default router;