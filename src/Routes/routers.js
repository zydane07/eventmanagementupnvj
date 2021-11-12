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
const homePage = require('../Controller/getHomepage');
routers.get('/',homePage);

const postHomePage = require('../Controller/homepage');
routers.post('/',postHomePage);

const detailEvent = require ('../Controller/getDetailEvent');
routers.get('/detail/:id_event', detailEvent);

// const daftarEvent = require ('../Controller/daftarEvent');
// routers.post('/detail/:id_event', daftarEvent);

const myEvent = require('../Controller/getMyEvent');
routers.get('/profile/event', myEvent);

// const mySertif = require('../Controller/getMySertif');
// routers.get('/sertifikat', mySertif);

const logoutAcc = require('../Controller/logoutAcc');
routers.delete('/logout', logoutAcc);

// const detailEvent = require('../Controller/getDetailEvent');
// routers.get('/detail',detailEvent);
module.exports = routers
