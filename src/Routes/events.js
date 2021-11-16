const express = require('express');
const eventController = require('../Controller/eventController');
const Identifikasi = require('./autentik');
const Auth = require('./verifyToken');
const router = express.Router();

/*
 router.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main-layout',
    title: 'Home',
    css: 'styleHome',
    nama: "bagas"
  });
});
*/
router.get('/eventDetail',(req,res)=>{
  res.render('eventdetail',{
    nama: 'Bagas',
    layout: 'layouts/main-layout',
    title: 'Detail Event',
    css: 'styleDetail',
  });
})
router.get('/eventList',(req,res)=>{
  res.render('eventlist',{
    nama: "bagas",
    layout: 'layouts/main-layout',
    title: 'Event List',
    css: 'styleDetail',
  });
})
/*
router.get('/search', (req, res) => {
  res.render('search', {
    layout: 'layouts/main-layout',
    title: 'search',
    css: 'styleHome',
    nama: "bagas",
  });
})
*/
router.get('/tentang', (req, res) => {
  res.render('about', {
    layout: 'layouts/about-layout',
    title: 'Tentang Aplikasi',
    css: 'styleHome',
  });
})


/**
 * @route /api/events
 */

router.get('/',Identifikasi, eventController.getEvents);
router.get('/detail/:id_event',Identifikasi,eventController.getEventsDetails);
router.post('/detail/:id_event',Auth,eventController.daftarEvent);
router.get('/search',Identifikasi,eventController.getEventsSearch);
router.get('/:id_ormawa/events',Identifikasi,eventController.getEventsOrmawa);
module.exports = router;