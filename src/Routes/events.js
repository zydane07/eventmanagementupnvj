const express = require('express');
const eventController = require('../Controller/eventController');
const Identifikasi = require('./autentik');
const checkRole = require('./checkAccessType');
const checkRoleMhs = require('./checkAccessTypeMhs');
const Auth = require('./verifyToken');
const router = express.Router();

router.get('/search', (req, res) => {
  res.render('search', {
    layout: 'layouts/main-layout',
    title: 'search',
    css: 'styleHome',
    nama: "bagas",
  });
})

router.get('/tentang', (req, res) => {
  res.render('about', {
    layout: 'layouts/about-layout',
    title: 'Tentang Aplikasi',
    css: 'styleHome',
  });
})

const saveEvent = require('../Controller/saveEvent');
router.post('/detail/:id_event', saveEvent);

const shareEvent = require('../Controller/shareEvent');
router.get('/event/:id_event' , shareEvent);

const myEvent = require('../Controller/getMyEvent');
router.get('/profile/events', myEvent);

/**
 * @route /api/events
 */

router.get('/',Identifikasi,checkRoleMhs, eventController.getEvents);
router.get('/detail/:id_event',Identifikasi,checkRoleMhs,eventController.getEventsDetails);
router.post('/detail/:id_event',Auth,checkRoleMhs,eventController.daftarEvent);
router.get('/search',Identifikasi,checkRoleMhs,eventController.getEventsSearch);
router.get('/:id_ormawa/events',Identifikasi,checkRoleMhs,eventController.getEventsOrmawa);
module.exports = router;