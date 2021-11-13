const express = require('express');
const authController = require('../Controller/authController');
const verifyController = require('../Controller/verifyController');
const mahasiswaController = require('../Controller/mahasiswaController');
const Auth = require('./verifyToken');
const router = express.Router();

/**
 * @router /api/auth
 */

 router.post('/register',mahasiswaController.register);
 router.get('/verification/:token',verifyController.verifUser);
 router.post('/verification',verifyController.resendEmail);
 router.post('/forget-password',authController.forgotPassword);
 router.post('/reset-password/:token',authController.resetPassword);
 router.post('/login',authController.login);
 router.delete('/logout', Auth, authController.logout);

 module.exports = router;
