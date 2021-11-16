const express = require('express');
const routers = express.Router();


routers.get('/login-ormawa', (req, res) => {
    res.render('login-ormawa', {
        layout: 'layouts/loginOrmawa-layout',
        css: 'login',
        title: 'login ormawa'
    });
})
routers.get('/dashboard-ormawa', (req, res) => {
    res.render('dashboard-ormawa', {
        layout: 'layouts/dashboardOrmawa-layout',
        css: 'dashboard',
        title: 'dashboard ormawa'
    });
})
routers.get('/event-ormawa', (req, res) => {
    res.render('event-ormawa', {
        layout: 'layouts/eventOrmawa-layout',
        css: 'dashboard',
        title: 'Event Saya'
    });
})

module.exports = routers
