const express = require('express');
const routers = express.Router();
const getProfile = require('../Controller/getUser');
const Auth = require('./verifyToken');

routers.get('/',Auth,(req,res)=>{
  const data = req.user
  res.render('index',{
    layout: 'layouts/main-layout',
    title: 'Home',
    css: 'styleHome',
    ...data
  });
});

//----------------------MAHASISWA---------------------------------------

//Register Akun untuk Mahasiswa
const registerMhs = require('../Controller/registerUser');
routers.post('/register',registerMhs)

//Verifikasi Akun setelah Register
const verifAkun = require('../Controller/verifUser');
routers.get('/verification/:token',verifAkun);

//Resend Email Verifikasi
const resendEmail = require('../Controller/resendVerif');
routers.post('/verification',resendEmail)

//Forget Password Akun
const forgetPass = require('../Controller/forgotPassword');
routers.post('/forget-password',forgetPass);

//Reset Password Akun yang forget Password
const resetPass = require('../Controller/resetPassword');
routers.post('/reset-password/:token',resetPass);

//Login Akun 
const loginMhs = require('../Controller/loginUser');
routers.post('/login',loginMhs);

//Data-data untuk Profile akun
const profileUser = require('../Controller/getProfile');
routers.get('/profile',Auth,profileUser);
//--------------------------------------------------------------------
/*
routers.get('/profile',Auth,(req,res)=>{
  const obj = getProfile();
  res.render('profile',{
    layout: 'layouts/main-layout',
    title: 'Profile',
    css: 'styleProfile',
    ...obj
  });
})

*/
module.exports = routers