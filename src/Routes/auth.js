const express = require('express');
const authController = require('../Controller/authController');
const verifyController = require('../Controller/verifyController');
const mahasiswaController = require('../Controller/mahasiswaController');
const Auth = require('./verifyToken');
const router = express.Router();

/**
 * @view
 */
 router.get("/login", (req, res) => {
  res.render("login", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "login",
  });
});

router.post('/login',authController.login);

router.get("/register", (req, res) => {
  res.render("register", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "register",
  });
});
router.post('/register',mahasiswaController.register);

router.get("/register2", (req, res) => {
  res.render("register2", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "register",
  });
});

router.get("/ResendVerif", (req, res) => {
  res.render("ResendVerif", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Resend Verif",
  });
});

router.post('/verification',verifyController.resendEmail);

router.get('/verification/:token',verifyController.verifUser);

router.get("/LupaPass", (req, res) => {
  res.render("LupaPass", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
  });
});

router.post('/forget-password',authController.forgotPassword);

router.get("/LupaPass2", (req, res) => {
  res.render("LupaPass2", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
  });
});

router.get("/reset-password/:token", (req, res) => {
  const {token} = req.params;
  res.render("LupaPass3", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
    token
  });
});

router.post('/reset-password/:token',authController.resetPassword);

router.get("/LupaPass4", (req, res) => {
  res.render("LupaPass4", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
  });
});

 router.post('/logout', Auth, authController.logout);

 module.exports = router;