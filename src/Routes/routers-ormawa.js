const express = require('express');
const routers = express.Router();
const ormawaController = require('../Controller/ormawaController');
const eventController = require('../Controller/eventController');
const checkRole = require('./checkAccessType');
const Auth = require('./verifyToken');
routers.get('/login-ormawa', (req, res) => {
    res.render('login-ormawa', {
        layout: 'layouts/loginOrmawa-layout',
        css: 'login',
        title: 'login ormawa',
       
    });
})
routers.get('/dashboard-ormawa', checkRole,Auth, eventController.getEventsOrmawaDashboard);

routers.get('/event-ormawa',  checkRole,Auth,eventController.getEventSayaOrmawa);

routers.get('/edit-event/:id_event', checkRole,Auth,eventController.getEventEdit);
routers.put('/edit-event/:id_event',checkRole,Auth,eventController.editEvent);
routers.delete('/delete/:id_event',checkRole,Auth,eventController.deleteEvent);
routers.get('/addevent-ormawa', (req, res) => {
    res.render('addevent-ormawa', {
        layout: 'layouts/eventOrmawa-layout',
        css: 'dashboard',
        title: 'Add Event'
    });
})
routers.post('/add-event',checkRole,Auth,ormawaController.createEvent);
module.exports = routers
