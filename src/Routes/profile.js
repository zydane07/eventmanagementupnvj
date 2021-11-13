const express = require('express');
const Auth = require('./verifyToken');
const profileController = require('../Controller/profileController');

const getProfile = require('../Controller/getUser');
const router = express.Router();

/**
 * @view
 */
 router.get("/profile", (req, res) => {
  const obj = getProfile();
  res.render("profile", {
    layout: "layouts/main-layout",
    title: "Profile",
    css: "styleProfile",
    ...obj,
  });
});


/**
 * @route /api/profile
 */
router.get('/', Auth, profileController.profile);

module.exports = router;