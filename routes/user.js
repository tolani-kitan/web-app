const express = require('express');
const { updateProfile, getLoggedInUser } = require('../controllers/users');

const router = express.Router();

router.put('/user/:id', updateProfile);
router.get('/user/:id', getLoggedInUser);


module.exports = router;