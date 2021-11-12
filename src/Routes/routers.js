const express = require('express');
const routers = express.Router();

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