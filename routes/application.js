const express = require('express');
const { newApp } = require('../controllers/application');

const router = express.Router();

router.post('/application', newApp);


module.exports = router;