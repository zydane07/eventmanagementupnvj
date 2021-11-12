const express = require('express');
const routers = express.Router();
const getProfile = require('../Controller/getUser');

routers.get('/', (req, res) => {
  const obj = getProfile();
  res.render('index', {
    layout: 'layouts/main-layout',
    title: 'Home',
    css: 'styleHome',
    ...obj
  });
});

routers.get('/profile', (req, res) => {
  const obj = getProfile();
  res.render('profile', {
    layout: 'layouts/main-layout',
    title: 'Profile',
    css: 'styleProfile',
    ...obj
  });
})

routers.get('/login', (req, res) => {
  res.render('login', {
    layout: 'layouts/login-layout',
    css: 'styleLoginOrmawa',
    title: 'login'
  });
})

routers.get('/register', (req, res) => {
  res.render('register', {
    layout: 'layouts/login-layout'
  })
})

routers.get('/search', (req, res) => {
  res.render('search', {
    layout: 'layouts/main-layout',
    title: 'search',
    css: 'styleHome',
  });
})

routers.get('/tentang', (req, res) => {
  res.render('about', {
    layout: 'layouts/about-layout',
    title: 'Tentang Aplikasi',
    css: 'styleHome',
  });
})

routers.get('/')

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
module.exports = routers