const express = require("express");
const adminController = require("../Controller/adminController");
const eventController = require("../Controller/eventController");
const router = express.Router();

const authAdmin = require('./verifyAdmin');
// router.post('/create', adminController.register);


router.get("/login-admin", (req, res) => {
    res.render("login-admin", {
        layout: "layouts/loginadmin-layout",
        css: "login",
        title: "login admin",
    });
});

router.post('/login-admin', adminController.login);

router.get("/dashboard-admin", authAdmin, adminController.dashboardAdmin);

router.get("/event-admin", authAdmin, adminController.getAllEvents);

router.delete("/event-delete/:id_event",authAdmin, eventController.deleteEvent);

router.put('/event-accept/:id_event',authAdmin, adminController.accEvent);

router.get("/event-details/:id_event", authAdmin, adminController.getEventDetail);

router.get("/pengguna-mahasiswa", authAdmin, adminController.getMahasiswa);

router.delete("/pengguna-mahasiswa/:email", authAdmin, adminController.deleteMahasiswa);

router.get("/pengguna-Ormawa", authAdmin, adminController.getOrmawa);

router.delete("/pengguna-ormawa/:id_ormawa", authAdmin, adminController.deleteOrmawa);

router.get("/lp-management", authAdmin, adminController.landingPage);

router.put("/lp-management",authAdmin, adminController.editLandingPage);

router.post('/lp-management',authAdmin, adminController.postLandingPage);

router.get("/tambah-ormawa", (req, res) => {
    res.render("tambahOrmawa-admin", {
        layout: "layouts/eventAdmin-layout",
        css: "admin",
        title: "Tambah Ormawa",
    });
});


router.post('/tambah-ormawa',adminController.register);

router.delete('/logout-admin',adminController.logout);


module.exports = router;
