const express = require('express');
const Auth = require('./verifyToken');
const profileController = require('../Controller/profileController');
const checkRoleMhs = require('./checkAccessTypeMhs');
const router = express.Router();

/**
 * @view
 */


/**
 * @route /profile
 * @description get profile by user cookie
 */
router.get('/profile', Auth,checkRoleMhs, profileController.profile);
router.put('/profile',Auth,checkRoleMhs,profileController.updateProfile);
router.get('/profile/event',(req,res)=>{
    res.render('eventsaya',{
      nama: "bagas",
      layout: 'layouts/main-layout',
      title: 'Event Saya',
      css: 'styleDetail',
    });
  })
module.exports = router;