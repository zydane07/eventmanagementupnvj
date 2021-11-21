const express = require("express");
const routers = express.Router();
const ormawaController = require('../Controller/ormawaController');
const eventController = require('../Controller/eventController');
const checkRole = require('./checkAccessType');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const Auth = require('./verifyToken');
routers.get('/login-ormawa', (req, res) => {
    res.render('login-ormawa', {
        layout: 'layouts/loginOrmawa-layout',
        css: 'login',
        title: 'login ormawa',
       

    });
});

routers.get("/dashboard-ormawa", checkRole, Auth, eventController.getEventsOrmawaDashboard);

routers.get("/event-ormawa", checkRole, Auth, eventController.getEventSayaOrmawa);

routers.get("/edit-event/:id_event", checkRole, Auth, eventController.getEventEdit);
routers.put("/edit-event/:id_event", checkRole, Auth,upload.single('image'), eventController.editEvent);
routers.delete("/delete/:id_event", checkRole, Auth, eventController.deleteEvent);
routers.get("/addevent-ormawa", (req, res) => {
    res.render("addevent-ormawa", {
        layout: "layouts/eventOrmawa-layout",
        css: "dashboard",
        title: "Add Event",
    });
});
routers.get("/detail-event/:id_event", checkRole, Auth, eventController.eventDetailOrmawa);

routers.get("/PerngaturanAkun-ormawa", checkRole, Auth, ormawaController.pengaturanOrmawa);

routers.put("/PerngaturanAkun-ormawa", upload.single('image'),checkRole, Auth, ormawaController.editPengaturanOrmawa);
routers.post('/add-event',upload.single('image'),checkRole,Auth,ormawaController.createEvent);
module.exports = routers

