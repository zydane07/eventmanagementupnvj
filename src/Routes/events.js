const express = require('express');
const eventController = require('../Controller/eventController');
const Identifikasi = require('./autentik');
const router = express.Router();

/**
 * @view
 */
/*
 router.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main-layout',
    title: 'Home',
    css: 'styleHome',
  });
});
*/
router.get('/eventDetail',(req,res)=>{
  res.render('eventdetail',{
    layout: 'layouts/main-layout',
    title: 'Detail Event',
    css: 'styleDetail',
  });
})
router.get('/eventList',(req,res)=>{
  res.render('eventlist',{
    layout: 'layouts/main-layout',
    title: 'Event List',
    css: 'styleDetail',
  });
})

router.get('/search', (req, res) => {
  res.render('search', {
    layout: 'layouts/main-layout',
    title: 'search',
    css: 'styleHome',
  });
})

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
router.get('/detail/:id_event',eventController.getEventsDetails);

module.exports = router;