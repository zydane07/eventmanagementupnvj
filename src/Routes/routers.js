// const express = require('express');
// const routers = express.Router();
// const getProfile = require('../Controller/getUser');

// routers.get('/',(req,res)=>{
//   const obj = getProfile();
//   res.render('index',{
//     layout: 'layouts/main-layout',
//     title: 'Home',
//     css: 'styleHome',
//     ...obj
//   });
// });

// routers.get('/profile',(req,res)=>{
//   const obj = getProfile();
//   res.render('profile',{
//     layout: 'layouts/main-layout',
//     title: 'Profile',
//     css: 'styleProfile',
//     ...obj
//   });
// })

// //^ JANGAN IKUTIN KAYAK DUA YANG DIATAS, CONTOHNYA DIBAWAH 

// routers.get('/profile',(req,res)=>{
//   res.render('profile',{
//     layout: 'layouts/main-layout',
//     title: 'Profile',
//     css: 'styleProfile',
//   });
// })

// routers.get('/',(req,res)=>{        '/' -> URL NYA APA
//   res.render('index',{              NGERENDER PAGE / HALAMAN YANG ADA DI FOLDER VIEWS
//     layout: 'layouts/main-layout',  KERANGKA WEBSITE KITA (Pake ini terus kecuali buat login dan regis)
//     title: 'Home',                  TITLE TIAP PAGE BEDA-BEDA
//     css: 'styleHome',               PAGE NYA MAKE FILE CSS YANG MANA
//   });
// })

// module.exports = routers


const express = require('express');
const routers = express.Router();
// const getHomepage = require('../Controller/getHomepage');
// const Auth = require('./verifyToken');

// routers.get('/',Auth,(req,res)=>{
//   const data = req.user
//   res.render('index',{
//     layout: 'layouts/main-layout',
//     title: 'Home',
//     css: 'styleHome',
//     ...data
//   });
// });

//----------------------MAHASISWA---------------------------------------

//Register Akun untuk Mahasiswa
// const registerMhs = require('../Controller/registerUser');
// routers.post('/register',registerMhs)

// //Verifikasi Akun setelah Register
// const verifAkun = require('../Controller/verifUser');
// routers.get('/verification/:token',verifAkun);

// //Resend Email Verifikasi
// const resendEmail = require('../Controller/resendVerif');
// routers.post('/verification',resendEmail)

// //Forget Password Akun
// const forgetPass = require('../Controller/forgotPassword');
// routers.post('/forget-password',forgetPass);

// //Reset Password Akun yang forget Password
// const resetPass = require('../Controller/resetPassword');
// routers.post('/reset-password/:token',resetPass);

// //Login Akun 
// const loginMhs = require('../Controller/loginUser');
// routers.post('/login',loginMhs);

// //Data-data untuk Profile akun
// const profileUser = require('../Controller/getProfile');
// routers.get('/profile',Auth,profileUser);

const homePage = require('../Controller/getHomepage');
routers.get('/',homePage);

// const detailEvent = require('../Controller/getDetailEvent');
// routers.get('/detail',detailEvent);
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
module.exports = routers;