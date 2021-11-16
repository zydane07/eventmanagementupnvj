const express = require('express');
const adminController = require('../Controller/adminController');
const router = express.Router();

router.post('/create',adminController.register);

module.exports = router;