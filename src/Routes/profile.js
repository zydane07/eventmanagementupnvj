const express = require('express');
const Auth = require('./verifyToken');
const profileController = require('../Controller/profileController');
const checkRoleMhs = require('./checkAccessTypeMhs');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const router = express.Router();

/**
 * @view
 */


/**
 * @route /profile
 * @description get profile by user cookie
 */
router.get('/profile', Auth,checkRoleMhs, profileController.profile);
router.put('/profile',Auth,checkRoleMhs,upload.single('image'),profileController.updateProfile);
router.get('/profile/event',Auth,checkRoleMhs,profileController.eventSaya);
router.get('/profile/wishlist',Auth,checkRoleMhs,profileController.eventWishSaya);
module.exports = router;