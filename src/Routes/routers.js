const express = require("express");
const routers = express.Router();
const getProfile = require("../Controller/getUser");

routers.get("/", (req, res) => {
  const obj = getProfile();
  res.render("index", {
    layout: "layouts/main-layout",
    title: "Home",
    css: "styleHome",
    ...obj,
  });
});

routers.get("/profile", (req, res) => {
  const obj = getProfile();
  res.render("profile", {
    layout: "layouts/main-layout",
    title: "Profile",
    css: "styleProfile",
    ...obj,
  });
});

routers.get("/login", (req, res) => {
  res.render("login", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "login",
  });
});

routers.get("/register", (req, res) => {
  res.render("register", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "register",
  });
});

routers.get("/register2", (req, res) => {
  res.render("register2", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "register",
  });
});

routers.get("/register3", (req, res) => {
  res.render("register3", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "register",
  });
});

routers.get("/ResendVerif", (req, res) => {
  res.render("ResendVerif", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Resend Verif",
  });
});

routers.get("/LupaPass", (req, res) => {
  res.render("LupaPass", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
  });
});

routers.get("/LupaPass2", (req, res) => {
  res.render("LupaPass2", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
  });
});

routers.get("/LupaPass3", (req, res) => {
  res.render("LupaPass3", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
  });
});

routers.get("/LupaPass4", (req, res) => {
  res.render("LupaPass4", {
    layout: "layouts/login-layout",
    css: "styleLoginUser",
    title: "Lupa Password",
  });
});

routers.get("/");

/*
routers.get('/profile',(req,res)=>{
  res.render('profile',{
    layout: 'layouts/main-layout',
    title: 'Profile',
    css: 'styleProfile',
  });
})

routers.get('/',(req,res)=>{        '/' -> URL NYA APA (endpoint)
  res.render('index',{              NGERENDER PAGE / HALAMAN YANG ADA DI FOLDER VIEWS
    layout: 'layouts/main-layout',  KERANGKA WEBSITE KITA (Pake ini terus kecuali buat login dan regis)
    title: 'Home',                  TITLE TIAP PAGE BEDA-BEDA
    css: 'styleHome',               PAGE NYA MAKE FILE CSS YANG MANA
  });
})
*/
module.exports = routers;
