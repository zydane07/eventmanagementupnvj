const express = require('express');
const routers = express.Router();


routers.get('/login-ormawa', (req, res) => {
    res.render('login-ormawa', {
        layout: 'layouts/loginOrmawa-layout',
        title: 'login ormawa'
    });
})

module.exports = routers
