const express = require('express');
const Auth = require('./verifyToken');
const profileController = require('../Controller/profileController');

const router = express.Router();
/**
 * @route /api/profile
 */
router.get('/', Auth, profileController.profile);

module.exports = router;