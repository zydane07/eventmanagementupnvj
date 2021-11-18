const express = require("express");
const authController = require("../Controller/authController");
const verifyController = require("../Controller/verifyController");
const mahasiswaController = require("../Controller/mahasiswaController");
const Auth = require("./verifyToken");
const router = express.Router();

/**
 * @routes /login
 * @description get and post for endpoint Login
 */
router.get("/login", (req, res) => {
    res.render("login", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "login",
    });
});

router.post("/login", authController.login);

/**
 * @routes /register
 * @description get and post for endpoint Register
 */
router.get("/register", (req, res) => {
    res.render("register", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "register",
    });
});
router.post("/register", mahasiswaController.register);

/**
 * @routes /register2
 * @description extended page for register if register succeded
 */
router.get("/register2", (req, res) => {
    res.render("register2", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "register",
    });
});

/**
 * @routes /ResendVerif
 * @description get and post for render and handle Resend Verification
 */
router.get("/ResendVerif", (req, res) => {
    res.render("ResendVerif", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "Resend Verif",
    });
});

router.post("/verification", verifyController.resendEmail);

/**
 * @routes /verification/:token
 * @description verify user by clicking link verification by mail.
 */
router.get("/verification/:token", verifyController.verifUser);

/**
 * @routes /LupaPass
 * @description get and post Forget password
 */
router.get("/LupaPass", (req, res) => {
    res.render("LupaPass", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "Lupa Password",
    });
});

router.post("/forget-password", authController.forgotPassword);

/**
 * @routes /LupaPass2
 * @description extended page for LupaPass
 */
router.get("/LupaPass2", (req, res) => {
    res.render("LupaPass2", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "Lupa Password",
    });
});

/**
 * @routes /reset-password/:token
 * @description get and post for render and handling Reset Password user
 */
router.get("/reset-password/:token", (req, res) => {
    const { token } = req.params;
    res.render("LupaPass3", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "Lupa Password",
        token,
    });
});

router.put("/reset-password/:token", authController.resetPassword);

/**
 * @routes /LupaPass4
 * @description extended page for reset pass after you changed the password
 */
router.get("/LupaPass4", (req, res) => {
    res.render("LupaPass4", {
        layout: "layouts/login-layout",
        css: "styleLoginUser",
        title: "Lupa Password",
    });
});

/**
 * @routes /logout
 * @description delete user token from cookies and redirect to login.
 */

router.delete("/logout", Auth, authController.logout);

module.exports = router;
