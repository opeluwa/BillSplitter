const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const partyController = require('../controller/parties');

router.post('',checkAuth, partyController.newParty);

// get all user parties
router.get('',checkAuth, partyController.getParties);

// delete user from a party
router.post('/leave/:id', checkAuth, partyController.leaveParty);


module.exports = router;
