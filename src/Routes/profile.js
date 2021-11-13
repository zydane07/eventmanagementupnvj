const express = require('express');
const Auth = require('./verifyToken');
const profileController = require('../Controller/profileController');

const router = express.Router();

/**
 * @view
 */


/**
 * @route /api/profile
 */
router.get('/profile', Auth, profileController.profile);

module.exports = router;