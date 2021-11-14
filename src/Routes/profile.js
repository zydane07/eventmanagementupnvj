const express = require('express');
const Auth = require('./verifyToken');
const profileController = require('../Controller/profileController');

const router = express.Router();

/**
 * @view
 */


/**
 * @route /profile
 * @description get profile by user cookie
 */
router.get('/profile', Auth, profileController.profile);

module.exports = router;