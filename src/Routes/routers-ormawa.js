const express = require('express');
const routers = express.Router();
const ormawaController = require('../Controller/ormawaController');

routers.get('/login-ormawa', (req, res) => {
    res.render('login-ormawa', {
        layout: 'layouts/loginOrmawa-layout',
        title: 'login ormawa'
    });
})

routers.post('/event',ormawaController.createEvent);
module.exports = routers
