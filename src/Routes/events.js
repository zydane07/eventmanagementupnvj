const express = require('express');
const eventController = require('../Controller/eventController');

const router = express.Router();

/**
 * @route /api/events
 */

router.get('/',eventController.getEvents);
router.get('/detail/:id_event',eventController.getEventsDetails);

module.exports = router;