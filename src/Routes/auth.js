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

router.get("/register", (req, res) => {
  res.render("register", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "register",
  });
});

router.get("/register2", (req, res) => {
  res.render("register2", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "register",
  });
});

router.get("/register3", (req, res) => {
  res.render("register3", {
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

router.get("/LupaPass", (req, res) => {
  res.render("LupaPass", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
  });
});

router.get("/LupaPass2", (req, res) => {
  res.render("LupaPass2", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
  });
});

router.get("/LupaPass3", (req, res) => {
  res.render("LupaPass3", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
  });
});

router.get("/LupaPass4", (req, res) => {
  res.render("LupaPass4", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
  });
});

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